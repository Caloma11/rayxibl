import React from "react";
import moment from "moment";

const CalendarDayHeader = ({ day, today }) => {
	return (
		<div className="dayHeader day">
			<span className="uppercase">{day.format("dd")}</span>
			<p className={today}>{day.format("D")}</p>
		</div>
	);
};

export const CalendarDayHeaders = ({ data, weekOffset }) => {
	return (
		<div className="dayHeaders">
			{data.slice(0, weekOffset).map((week, i) => {
				return week.map((day, j) => {
					const today = day.isSame(moment(), "day") ? "today" : "";

					return (
						<CalendarDayHeader key={`${i}_${j}`} today={today} day={day} />
					);
				});
			})}
		</div>
	);
};
