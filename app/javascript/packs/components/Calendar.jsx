import Moment from "moment";
import { extendMoment } from "moment-range";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { initialDays } from "../../utils/initialDays";
import { BookingForm } from "./BookingForm";
import { CalendarDays } from "./CalendarDays";
import { CalendarDayHeaders } from "./CalendarDayHeaders";
import { CalendarProfiles } from "./CalendarProfiles";

const moment = extendMoment(Moment);

const Calendar = () => {
	const [profiles, setProfiles] = useState([]);
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
			e.currentTarget.offsetWidth;

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

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get("/api/v1/networks");
				setProfiles(data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	return (
		<section id="calendar">
			{showForm && formDetails && Object.keys(formDetails).length > 0 && (
				<BookingForm formDetails={formDetails} setShowForm={setShowForm} />
			)}
			<div className="calendarContainer" onScroll={handleScroll}>
				<CalendarProfiles profiles={profiles} />
				<div className="allDays">
					<CalendarDayHeaders data={data} weekOffset={weekOffset} />
					{profiles.map((profile, i) => {
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
					})}
				</div>
			</div>
		</section>
	);
};

ReactDOM.render(<Calendar />, document.querySelector("#calendar-page"));
