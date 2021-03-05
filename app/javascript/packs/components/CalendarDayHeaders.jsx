import React, { useEffect, useRef, forwardRef } from "react";
import moment from "moment";

const WEEKEND_CLASS_NAMES = "weekend";
const INTERSECTION_OPTIONS = {
	root: null,
	margin: "0px",
	threshold: 0
};

const CalendarDayHeader = forwardRef(
	({ day, today, weekend, setMonth }, refs) => {
		const monthOfDay = day.format("MMMM");
		const yearOfDay = day.format("YYYY");
		const dayNumber = parseInt(day.format("D"), 10);
		const firstDayOfMonthRef = useRef(null);
		const observerRef = useRef(
			new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) {
					const month = day.format("MMMM");
					const {
						moveMonthRef,
						forceTodayRef,
						monthScrollChangeRef,
						jumpRef
					} = refs;
					if (!jumpRef.current) {
						setMonth(month);
						monthScrollChangeRef.current = true;
						moveMonthRef.current = false;
						forceTodayRef.current = true;
					}
				}
			}, INTERSECTION_OPTIONS)
		);

		useEffect(() => {
			if (firstDayOfMonthRef.current) {
				observerRef.current.observe(firstDayOfMonthRef.current);
			}

			return () => {
				observerRef.current.disconnect();
			};
		}, []);

		return (
			<div
				className={`dayHeader day ${weekend}`}
				data-month={monthOfDay}
				data-year={yearOfDay}
				ref={dayNumber === 1 ? firstDayOfMonthRef : null}
			>
				<span className={`uppercase ${today}`}>{day.format("ddd")}</span>
				<p className={today}>{dayNumber}</p>
			</div>
		);
	}
);

export const CalendarDayHeaders = forwardRef(
	({ data, weekOffset, setMonth }, refs) => {
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
								setMonth={setMonth}
								ref={refs}
							/>
						);
					});
				})}
			</div>
		);
	}
);
