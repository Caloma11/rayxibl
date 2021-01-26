import React, { useState } from "react";
import ReactDOM from "react-dom";
import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

const initialData = [];
const startWeek = moment().add(0, "M").startOf("month").week();
const endWeek = moment().add(0, "M").endOf("month").week();
for (let week = startWeek; week < endWeek; week += 1) {
	const day = Array(7)
		.fill(0)
		.map((n, i) =>
			moment()
				.week(week)
				.startOf("week")
				.clone()
				.add(n + i, "day")
		);
	initialData.push(day);
}

const generateData = (monthOffset = 0) => {
	const final = [];
	const startWeek = moment().add(monthOffset, "M").startOf("month").week();
	const endWeek = moment().add(monthOffset, "M").endOf("month").week();
	for (let week = startWeek; week < endWeek; week += 1) {
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
const profiles = [
	{
		id: 1,
		name: "Rayhan"
	},
	{
		id: 2,
		name: "Abisha"
	},
	{
		id: 3,
		name: "Wirjowerdojo"
	}
];

const Calendar = () => {
	const [data, setData] = useState(initialData);
	const [monthOffset, setMonthOffset] = useState(0);
	const [weekOffset, setWeekOffset] = useState(1);
	const [numberOfWeeks, setNumberOfWeeks] = useState(Array(7).fill(0));

	const handleDayClick = ({ profile, i, j }) => {
		console.log({ profile, i, j });
	};

	const handleScroll = e => {
		const reachedEnd =
			e.currentTarget.scrollWidth - e.currentTarget.scrollLeft <=
			e.currentTarget.offsetWidth;

		if (reachedEnd) {
			setWeekOffset(prevState => prevState + 1);
			setNumberOfWeeks(prevState => [...prevState, ...Array(7).fill(0)]);
		}

		if (weekOffset % 5 === 0 && reachedEnd) {
			console.log("generate new days");
			setMonthOffset(prevState => prevState + 1);
			// + 1 because has not re-rendered
			const newDays = generateData(monthOffset + 1);
			setData(prevState => [...prevState, ...newDays]);
		}
	};

	return (
		<section id="calendar">
			<h1>Calendar</h1>

			<div className="calendarContainer" onScroll={handleScroll}>
				<div className="profiles">
					<div className="week blank"></div>
					{profiles.map(profile => (
						<div key={profile.id} className="week profile">
							<p>{profile.name}</p>
						</div>
					))}
				</div>
				<div className="allDays">
					<div className="dayHeaders">
						{data.slice(0, weekOffset).map((week, i) => {
							return week.map((day, j) => {
								const today = day.isSame(moment(), "day") ? "today" : "";

								return (
									<div key={`${i}_${j}`} className="dayHeader day">
										<span className="uppercase">{day.format("dd")}</span>
										<p className={today}>{day.format("D")}</p>
									</div>
								);
							});
						})}
					</div>
					{profiles.map((profile, i) => {
						return (
							<div className="daysCollection" key={i}>
								{numberOfWeeks.map((_, j) => (
									<div
										className="day"
										onClick={() => handleDayClick({ profile, i, j })}
										key={`${j}_${i}`}
									></div>
								))}
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

ReactDOM.render(<Calendar />, document.querySelector("#calendar-page"));
