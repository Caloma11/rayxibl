import React from "react";
import moment from "moment";
import { truncate } from "../../utils/truncate";

const START_EVENT_CLASS_NAMES = "rounded-top-left rounded-bottom-left pl-1";
const EVENT_CLASS_NAMES = "event py-1";
const END_EVENT_CLASS_NAMES = "rounded-top-right rounded-bottom-right";

const determineColor = status => {
	if (status === "rejected") {
		return "red";
	} else if (status === "accepted") {
		return "green";
	}

	return "yellow";
};
const DAY_WIDTH = 80;

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
	const eventDateBooleans = bookings.map(booking => {
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
			{eventDateBooleans.map((a, i) => {
				if (!a.some(ele => ele)) return null;

				const booking = bookings[i];
				const eventClassName = `${EVENT_CLASS_NAMES} ${
					a[0] ? START_EVENT_CLASS_NAMES : ""
				} ${a[2] ? END_EVENT_CLASS_NAMES : ""} ${determineColor(
					booking.status
				)}`;
				const momentStart = moment(booking.startDate);
				const momentEnd = moment(booking.endDate);
				let eventDuration = momentEnd.diff(momentStart, "days") + 1;
				let timeText;

				if (booking.duration) {
					timeText = `${booking.duration} HR / DAY`;
				} else {
					timeText = `${booking.startTime} - ${booking.endTime}`;
				}

				if (eventDuration === 0) eventDuration = 1;

				return (
					<div
						key={i}
						className={eventClassName}
						style={{
							height: DAY_WIDTH / eventDateBooleans.length
						}}
						onClick={handleEventClick}
					>
						{a[0] && (
							<div
								className="event-details"
								style={{ width: DAY_WIDTH * eventDuration }}
							>
								<p className="title">
									{truncate(booking.title, { scale: eventDuration })}
								</p>
								<p className="time">{timeText}</p>
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
};
