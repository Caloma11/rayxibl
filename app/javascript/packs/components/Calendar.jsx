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
import { CalendarMonthSelection } from "./CalendarMonthSelection";
import { MONTHS } from "../../utils/constants";
import useDidMountEffect from "../hooks/useDidMountEffect";

const moment = extendMoment(Moment);

window.moment = moment;

const generateJumpData = (chosenMonth, year) => {
	const final = [];
	const startWeek = chosenMonth.startOf("month").week();
	const endWeek = chosenMonth.endOf("month").week();

	for (let week = startWeek; week < endWeek; week += 1) {
		const day = Array(7)
			.fill(0)
			.map((n, i) =>
				moment()
					.week(week)
					.startOf("week")
					.clone()
					.add(n + i, "day")
					.year(year)
			);
		final.push(day);
	}

	return final;
};

const Calendar = () => {
	const [loading, setLoading] = useState(true);
	const [profiles, setProfiles] = useState([]);
	const [bookings, setBookings] = useState([]);
	const [data, setData] = useState(initialDays);
	// Start to be used after reaching the next month
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
	const today = moment();
	const [month, setMonth] = useState(today.format("MMMM"));
	const [year, setYear] = useState(parseInt(today.format("YYYY"), 10));
	const calendarContainerRef = useRef(null);
	const forceTodayRef = useRef(false);
	const moveMonthRef = useRef(false);

	const generatePreviousData = () => {
		const final = [];
		const endDate = data[0][0].clone().subtract(1, "d");
		const endDateWeek = endDate.week();
		const startDate = endDate.clone().subtract(1, "week");
		const startDateWeek = startDate.week() + 1;

		for (let week = startDateWeek; week <= endDateWeek; week += 1) {
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

		return final;
	};

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

	const addNewMonth = (jump = false) => {
		if (jump) {
			const momentDate = moment(
				`${year}-${MONTHS.indexOf(month) + 1}-1`,
				"YYYY-M-D"
			);
			const newDays = generateJumpData(momentDate, year);
			const lastWeekOfNewData = newDays[newDays.length - 1];
			const lastDayOfNewData = lastWeekOfNewData[lastWeekOfNewData.length - 1];

			setMonthOffset(parseInt(lastDayOfNewData.format("M"), 10));
			setWeekCounter(lastDayOfNewData.clone().week() + 1);
			setData(newDays);
		} else {
			setMonthOffset(prevState => prevState + 1);
			const newDays = generateData();
			setData(prevState => [...prevState, ...newDays]);
		}
	};

	const handleScroll = e => {
		const reachedEnd =
			e.currentTarget.scrollWidth - e.currentTarget.scrollLeft <=
			e.currentTarget.offsetWidth + 20;
		const atBeginning = e.currentTarget.scrollLeft === 0;
		const { scrollTop } = e.currentTarget;

		if (scrollTop > 0) return;

		if (reachedEnd && monthOffset <= 12) {
			setWeekOffset(prevState => prevState + 1);
			setNumberOfWeeks(prevState => [...prevState, [...Array(7).fill(0)]]);

			// Happens every 4 weeks
			if (weekOffset % 4 === 0) {
				addNewMonth();
			}
		} else if (atBeginning && scrollTop === window.pageYOffset) {
			const previousDays = generatePreviousData();
			setWeekOffset(prevState => prevState + 1);
			setNumberOfWeeks(prevState => [[...Array(7).fill(0)], ...prevState]);
			setData(prev => [...previousDays, ...prev]);
		}
	};

	const moveToToday = () => {
		forceTodayRef.current = true;
		const today = moment();
		setMonth(today.format("MMMM"));
		setYear(parseInt(today.format("YYYY"), 10));
		if (year !== parseInt(moment().format("YYYY"), 10)) {
			setData(initialDays);
		} else {
			const todayCell = document.querySelector(".day.today");
			if (!todayCell) {
				setData(initialDays);
			} else {
				calendarContainerRef.current.scrollTo({
					left: todayCell.offsetLeft - 108,
					behavior: "smooth"
				});
			}
		}
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

	useDidMountEffect(() => {
		if (!forceTodayRef.current || moveMonthRef.current) {
			addNewMonth(true);
		}

		moveMonthRef.current = false;
	}, [month, year]);

	useDidMountEffect(() => {
		const dates = data.flat().map(date => date.format("YYYY-MM-DD"));
		const today = moment().format("YYYY-MM-DD");

		if (dates.includes(today) && forceTodayRef.current) {
			const todayCell = document.querySelector(".day.today");
			calendarContainerRef.current.scrollTo({
				left: todayCell.offsetLeft - 108,
				behavior: "smooth"
			});
		}

		forceTodayRef.current = false;
	}, [data]);

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
			<div className="flex justify-content-between items-center relative">
				<div style={{ width: 70, height: 70 }}></div>
				<CalendarMonthSelection
					month={month}
					setMonth={setMonth}
					year={year}
					setYear={setYear}
					ref={moveMonthRef}
				/>
				<CalendarFilter setProfiles={setProfiles} bookings={bookings} />
			</div>
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
