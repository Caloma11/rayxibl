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

// window.moment = moment;

const Calendar = () => {
	const [loading, setLoading] = useState(true);
	const [profiles, setProfiles] = useState([]);
	const [bookings, setBookings] = useState([]);
	const [professions, setProfessions] = useState([]);
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
	const monthScrollChangeRef = useRef(false);
	const jumpRef = useRef(false);

	const generateJumpData = chosenMonth => {
		const final = [];
		const startWeek = chosenMonth.startOf("month").week();
		let endWeek = chosenMonth.endOf("month").week();

		if (endWeek === 1) {
			// Last week of the year
			endWeek = 54;
		}

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

		if (endWeek === 54) {
			const lastWeekOfYear = final[final.length - 1];
			let lastDayOfYear = lastWeekOfYear[lastWeekOfYear.length - 1];
			// This mutates the last element within the `final` variable
			lastDayOfYear = lastDayOfYear.add(1, "y");
		}

		return final;
	};

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

	const generateNextYearData = () => {
		const final = [];
		const endOfJanuary = moment().startOf("y").endOf("M").week();

		for (let week = 1; week < endOfJanuary; week += 1) {
			const day = Array(7)
				.fill(0)
				.map((n, i) => {
					const d = moment()
						.week(week)
						.startOf("week")
						.clone()
						.add(n + i, "day")
						.year(year);

					if (d.format("M") === "1") {
						d.year(year + 1);
					}

					return d;
				});

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
			const newDays = generateJumpData(momentDate);
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
				const lastWeek = data[data.length - 1];
				const lastDay = lastWeek[lastWeek.length - 1];

				if (lastDay.format("DD-MM") === "01-01") {
					const nextYear = generateNextYearData();
					setWeekOffset(1);
					setNumberOfWeeks(Array(1).fill(Array(7).fill(0)));
					setData(nextYear);
					forceTodayRef.current = true;
					moveMonthRef.current = false;
					setMonth("January");
					setYear(prev => prev + 1);
					forceTodayRef.current = false;
					moveMonthRef.current = true;
				} else {
					addNewMonth();
				}
			}
		} else if (atBeginning && scrollTop === window.pageYOffset) {
			const previousDays = generatePreviousData();
			setWeekOffset(prevState => prevState + 1);
			setNumberOfWeeks(prevState => [[...Array(7).fill(0)], ...prevState]);
			setData(prev => [...previousDays, ...prev]);
			/***
			 ** Explanation:
			 ** 80 => Width per (.day) cell
			 ** 7 => Number of days that gets loaded
			 ** 80 * 7 = 560px ->
			 ** - Each cell is 80px wide
			 ** - 7 cells get generated everytime you go back in time
			 ** - This prevents the content jump issue by scrolling back (instantly) to the position of the first (old*) cell
			 ** - *old cell being the first (left-most) cell before the new cells get inserted
			 ** ----------------------------------------
			 ** Conclusion: Smoother experience for user
			 ***/
			calendarContainerRef.current.scrollTo({ left: 80 * 7 });
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
				setProfessions(data.map(pr => pr.profession));
			} catch (error) {
				console.log(error);
			}
			setLoading(false);
		})();
	}, []);

	useEffect(() => {
		setTimeout(() => {
			const todayCell = document.querySelector(".day.today");

			if (todayCell && calendarContainerRef) {
				calendarContainerRef.current.scrollTo({
					left: todayCell.offsetLeft - 92,
					behavior: "smooth"
				});
			}
		}, 1000);
	}, []);

	useDidMountEffect(() => {
		if (!forceTodayRef.current || moveMonthRef.current) {
			addNewMonth(true);
			setTimeout(() => {
				const chosenMonth = document.querySelector(`[data-month="${month}"]`);
				if (chosenMonth) {
					calendarContainerRef.current.scrollTo({
						left: chosenMonth.offsetLeft - 92
					});
				}
			}, 1000);
		}

		moveMonthRef.current = false;
	}, [month, year]);

	useDidMountEffect(() => {
		const dates = data.flat().map(date => date.format("YYYY-MM-DD"));
		const today = moment().format("YYYY-MM-DD");
		const condition =
			dates.includes(today) &&
			forceTodayRef.current &&
			!monthScrollChangeRef.current;

		if (condition) {
			const todayCell = document.querySelector(".day.today");
			calendarContainerRef.current.scrollTo({
				left: todayCell.offsetLeft - 108,
				behavior: "smooth"
			});
		}

		forceTodayRef.current = false;
		monthScrollChangeRef.current = false;
	}, [data]);

	useEffect(() => {
		const nav = document.querySelector("nav.navbar");
		if (showForm) {
			nav.classList.add("none");
		} else {
			nav.classList.remove("none");
		}
	}, [showForm]);

	if (loading) {
		return (
			<section
				id="calendar"
				className="flex justify-content-center items-center pt-5"
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
			<div className="flex justify-content-between items-center relative mt-4 mb-3">
				<div style={{ width: 70, height: 70 }}></div>
				<CalendarMonthSelection
					month={month}
					setMonth={setMonth}
					year={year}
					setYear={setYear}
					ref={{ moveMonthRef, jumpRef }}
				/>
				<CalendarFilter
					setProfiles={setProfiles}
					bookings={bookings}
					professions={professions}
				/>
			</div>
			<div
				className={`calendarContainer ${showForm ? "none" : ""}`}
				onScroll={handleScroll}
				ref={calendarContainerRef}
			>
				<CalendarProfiles profiles={profiles} moveToToday={moveToToday} />
				<div className="allDays">
					<CalendarDayHeaders
						data={data}
						weekOffset={weekOffset}
						setMonth={setMonth}
						ref={{ moveMonthRef, forceTodayRef, monthScrollChangeRef, jumpRef }}
					/>
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
									first={i === 0}
									ref={calendarContainerRef}
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
