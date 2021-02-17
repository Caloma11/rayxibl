import Moment from "moment";
import { extendMoment } from "moment-range";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { initialDays } from "../../utils/initialDays";
import { BookingForm } from "./BookingForm";
import { CalendarDays } from "./CalendarDays";
import { CalendarDayHeaders } from "./CalendarDayHeaders";
import { CalendarProfiles } from "./CalendarProfiles";
import { CalendarFilter } from "./CalendarFilter";

const moment = extendMoment(Moment);

const Calendar = () => {
	const [loading, setLoading] = useState(true);
	const [profiles, setProfiles] = useState([]);
	const [bookings, setBookings] = useState([]);
	const [data, setData] = useState(initialDays);
	const [monthOffset, setMonthOffset] = useState(1);
	const [weekOffset, setWeekOffset] = useState(1);
	const [numberOfWeeks, setNumberOfWeeks] = useState(
		Array(1).fill(Array(7).fill(0))
	);
	const [showForm, setShowForm] = useState(false);
	const [formDetails, setFormDetails] = useState(null);
	const lastRenderedWeek = initialDays[initialDays.length - 1];
	const lastRenderedDay = lastRenderedWeek[lastRenderedWeek.length - 1];
	const [weekCounter, setWeekCounter] = useState(lastRenderedDay.week() + 1);
	const calendarContainerRef = useRef(null);

	const generateData = () => {
		const final = [];
		const withMonthOffset = moment().add(monthOffset, "M");
		const endWeek = withMonthOffset.endOf("month").week();
		for (let week = weekCounter; week < endWeek; week += 1) {
			const day = Array(7)
				.fill(0)
				.map((n, i) =>
					moment()
						.week(week)
						.startOf("week")
						.clone()
						.add(n + i, "day")
				);
			final.push(day);
		}

		const lastWeekOfNewData = final[final.length - 1];
		const lastDayOfNewData = lastWeekOfNewData[lastWeekOfNewData.length - 1];

		setWeekCounter(lastDayOfNewData.week() + 1);

		return final;
	};

	const handleScroll = e => {
		const reachedEnd =
			e.currentTarget.scrollWidth - e.currentTarget.scrollLeft <=
			e.currentTarget.offsetWidth + 20;

		// TODO: Handle next year
		// Problem right now is: <CalendarDayHeader /> visually breaks (offset)
		if (reachedEnd && monthOffset <= 12) {
			setWeekOffset(prevState => prevState + 1);
			setNumberOfWeeks(prevState => [...prevState, [...Array(7).fill(0)]]);

			// Happens every 4 weeks
			if (weekOffset % 4 === 0) {
				setMonthOffset(prevState => prevState + 1);
				const newDays = generateData();
				setData(prevState => [...prevState, ...newDays]);
			}
		}
	};

	const moveToToday = () => {
		const todayCell = document.querySelector(".day.today");
		calendarContainerRef.current.scrollTo({
			left: todayCell.offsetLeft - 108
		});
	};

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get("/api/v1/networks");
				setProfiles(data);
				setBookings(
					data
						.map(pr => pr.bookings)
						.flat()
						.map(({ id, title }) => ({ id, title }))
				);
			} catch (error) {
				console.log(error);
			}
			setLoading(false);
		})();
	}, []);

	if (loading) {
		return (
			<section
				id="calendar"
				className="flex justify-content-center items-center"
			>
				<h1>Loading...</h1>
			</section>
		);
	}

	return (
		<section id="calendar">
			{showForm && formDetails && Object.keys(formDetails).length > 0 && (
				<BookingForm formDetails={formDetails} setShowForm={setShowForm} />
			)}
			<CalendarFilter setProfiles={setProfiles} bookings={bookings} />
			<div
				className={`calendarContainer ${showForm ? "none" : ""}`}
				onScroll={handleScroll}
				ref={calendarContainerRef}
			>
				<CalendarProfiles profiles={profiles} moveToToday={moveToToday} />
				<div className="allDays">
					<CalendarDayHeaders data={data} weekOffset={weekOffset} />
					{profiles.length > 0 ? (
						profiles.map((profile, i) => {
							return (
								<CalendarDays
									numberOfWeeks={numberOfWeeks}
									key={i}
									profile={profile}
									data={data}
									setShowForm={setShowForm}
									setFormDetails={setFormDetails}
								/>
							);
						})
					) : (
						<div className="mx-3">
							<h1 className="textDarkGray">No profile...</h1>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

ReactDOM.render(<Calendar />, document.querySelector("#calendar-page"));
