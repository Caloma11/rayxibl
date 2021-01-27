import React from "react";
import moment from "moment";

const START_EVENT_CLASS_NAMES = "rounded-top-left rounded-bottom-left pl-1";
const EVENT_CLASS_NAMES = "event py-1";
const END_EVENT_CLASS_NAMES = "rounded-top-right rounded-bottom-right";

export const CalendarDay = ({
	handleDayClick,
	dayOfWeek,
	today,
	week,
	day,
	bookings
}) => {
	const todayClassName = today ? "today" : "";
	/*
    ORDER OF ARRAY:
    [IS_START_DATE, IN_BETWEEN, IS_END_DATE]
  */
	const hehe = bookings.map(booking => {
		return [
			moment(booking.startDate).isSame(dayOfWeek, "day"),
			dayOfWeek.isBetween(booking.startDate, booking.endDate),
			moment(booking.endDate).isSame(dayOfWeek, "day")
		];
	});

	const handleEventClick = e => {
		// To cancel the parent's click event listener
		e.stopPropagation();
		console.log("do something");
	};

	return (
		<div
			className={`day ${todayClassName}`}
			onClick={() => handleDayClick({ week, day })}
		>
			{hehe.map((a, i) => {
				if (!a.some(ele => ele)) return null;

				const booking = bookings[i];
				const eventClassName = `${EVENT_CLASS_NAMES} ${
					a[0] ? START_EVENT_CLASS_NAMES : ""
				} ${a[2] ? END_EVENT_CLASS_NAMES : ""}`;

				return (
					<div
						key={i}
						className={eventClassName}
						style={{ height: 80 / hehe.length }}
						onClick={handleEventClick}
					>
						{a[0] && (
							<p className="event-details" style={{ width: 80 * hehe.length }}>
								{booking.title}
							</p>
						)}
					</div>
				);
			})}
		</div>
	);
};
