import React, { useState } from "react";
import ReactDOM from "react-dom";
import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

const monthOffset = 0;
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
	const [data, setData] = useState(final);

	return (
		<section id="calendar">
			<h1>Calendar</h1>

			<div className="calendarContainer">
				<div className="profiles">
					{profiles.map(profile => (
						<div key={profile.id} className="week profile">
							<p>{profile.name}</p>
						</div>
					))}
				</div>
				<div className="daysCollection">
					{profiles.map(profile => (
						<div key={profile.id} className="week">
							{data.map((week, i) => {
								return week.map((day, j) => {
									return (
										<div key={`${i}_${j}`} className="day">
											<p>{day.format("DD-MM-YYYY")}</p>
										</div>
									);
								});
							})}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

ReactDOM.render(<Calendar />, document.querySelector("#calendar-page"));
