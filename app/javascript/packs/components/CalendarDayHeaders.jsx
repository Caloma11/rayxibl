import React from "react";
import moment from "moment";

const WEEKEND_CLASS_NAMES = "weekend";

const CalendarDayHeader = ({ day, today, weekend }) => {
	return (
		<div className={`dayHeader day ${weekend}`}>
			<span className={`uppercase ${today}`}>{day.format("ddd")}</span>
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
					const isWeekend = [0, 6].includes(day.day());
					const weekend = isWeekend ? WEEKEND_CLASS_NAMES : "";

					return (
						<CalendarDayHeader
							key={`${i}_${j}`}
							today={today}
							day={day}
							weekend={weekend}
						/>
					);
				});
			})}
		</div>
	);
};
