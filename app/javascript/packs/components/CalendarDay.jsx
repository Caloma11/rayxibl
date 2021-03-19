import React, { useRef, useEffect, forwardRef } from "react";
import moment from "moment";
import { truncate } from "../../utils/truncate";

const START_EVENT_CLASS_NAMES =
	"event-start rounded-top-left rounded-bottom-left pl-1";
const EVENT_CLASS_NAMES = "event";
const END_EVENT_CLASS_NAMES =
	"event-end rounded-top-right rounded-bottom-right mr-0";
const WEEKEND_CLASS_NAMES = "weekend";
const FRIDAY_CLASS_NAMES = "no-border-right";
const SATURDAY_CLASS_NAMES = "dark-border-left";
const SUNDAY_CLASS_NAMES = "dark-border-right";

const determineColor = status => {
	if (["rejected", "canceled"].includes(status)) {
		return "red";
	} else if (status === "accepted") {
		return "green";
	}

	return "yellow";
};
const DAY_WIDTH = 80;

/*
  Variable definitions:
  1. handleDayClick({ week, day }) => Click listener on an Event
  2. dayOfWeek => MomentJS object of a Date -> particularly each Day
  3. today => Boolean that checks whether a `dayOfWeek` is `today` or not
  4. week => Relative week number from start of year
  5. day => Day number of a week (0 -> Sunday)
  6. bookings => All bookings (events)
*/

export const CalendarDay = forwardRef(
	(
		{ handleDayClick, dayOfWeek, today, week, day, bookings },
		calendarContainerRef
	) => {
		const eventRef = useRef(null);
		const maxPossibleLength = useRef(null);
		const moreThanOneWeek = useRef(false);
		const durationRef = useRef(1);
		const bookingEndDateRef = useRef(null);
		const dayRef = useRef(null);
		// Checks if today, if so, use `"today"` as a class to color the background differently
		const todayClassName = today ? "today" : "";
		// Checks if date is weekend, for styling
		const isWeekend = [0, 6].includes(dayOfWeek.day());
		const weekend = isWeekend ? WEEKEND_CLASS_NAMES : "";
		const isFriday = dayOfWeek.day() === 5;
		const isSaturday = dayOfWeek.day() === 6;
		const isSunday = dayOfWeek.day() === 0;
		const friday = isFriday ? FRIDAY_CLASS_NAMES : "";
		const saturday = isSaturday ? SATURDAY_CLASS_NAMES : "";
		const sunday = isSunday ? SUNDAY_CLASS_NAMES : "";
		/*
    Used to render the events properly (particularly if it's multi-day)
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

		// Go to bookings#edit page if an event is clicked
		const handleEventClick = (e, bookingId) => {
			// To cancel the parent's click event listener
			e.stopPropagation();

			window.location = `/bookings/${bookingId}/edit`;
		};

		useEffect(() => {
			calendarContainerRef?.current.addEventListener("scroll", () => {
				if (eventRef.current) {
					const { x } = eventRef.current.getBoundingClientRect();
					const details = eventRef.current.querySelector(".event-details");
					const renderedWidth = details.style.width.match(/\d+/);
					const activeWidth = renderedWidth
						? parseInt(renderedWidth[0], 10)
						: 0;

					if (x <= 90) {
						const currentWidth = DAY_WIDTH * durationRef.current - 4;

						if (details) {
							details.style.left = `${90 - x + 8}px`;

							if (moreThanOneWeek.current) {
								let dynamicWidth = maxPossibleLength.current;

								// If event date ends after shown last day
								const days = document.querySelectorAll(".day");
								const lastVisibleDay = moment(
									days[days.length - 1].dataset.formattedDay,
									"DD-MM-YYYY"
								);
								if (!bookingEndDateRef.current.isBefore(lastVisibleDay)) {
									const dayDiff = bookingEndDateRef.current.diff(
										lastVisibleDay,
										"days"
									);
									const subtractor = DAY_WIDTH * dayDiff;

									dynamicWidth -= subtractor;
								}

								dynamicWidth = dynamicWidth - (90 - x) - 8;
								details.style.width = `${dynamicWidth}px`;
							} else {
								details.style.width = `${currentWidth - (90 - x) - 8}px`;
							}
						}
					}

					if (activeWidth <= 40) {
						details.style.left = 0;
					}
				}
			});
		}, []);

		useEffect(() => {
			if (dayRef.current) {
				const eventsWithinADay = dayRef.current.querySelectorAll(".event");
				if (eventsWithinADay.length > 1) {
					const [first, second] = eventsWithinADay;
					dayRef.current.insertBefore(second, first);
				}

				const previousDayCell = dayRef.current.previousElementSibling;
				if (previousDayCell) {
					const previousDayEventCount = previousDayCell.querySelectorAll(
						".event"
					).length;
					if (previousDayEventCount > 1 && eventsWithinADay.length === 1) {
						dayRef.current.insertAdjacentHTML(
							"afterbegin",
							`<div class="event empty" style="height: 52px; width: 82px"></div>`
						);
					}
				}
			}
		}, []);

		return (
			<div
				className={`day ${todayClassName} ${weekend} ${friday} ${saturday} ${sunday}`}
				onClick={() => handleDayClick({ week, day })}
				data-formatted-day={dayOfWeek.format("DD-MM-YYYY")}
				ref={dayRef}
			>
				{eventDateBooleans.map((a, i) => {
					if (!a.some(ele => ele)) return null;
					{
						/*  */
					}
					{
						/* Every individual booking */
					}
					const booking = bookings[i];
					{
						/* Used for styling */
					}
					const eventClassName = `${EVENT_CLASS_NAMES} ${
						a[0] ? START_EVENT_CLASS_NAMES : ""
					} ${a[2] ? END_EVENT_CLASS_NAMES : ""} ${determineColor(
						booking.status
					)}`;
					{
						/* Generate MomentJS object of a booking's start date */
					}
					const momentStart = moment(booking.startDate);
					{
						/* Generate MomentJS object of a booking's end date */
					}
					const momentEnd = moment(booking.endDate);
					bookingEndDateRef.current = momentEnd;
					{
						/* Calculate the date difference (in days) of the booking's duration */
					}
					let eventDuration = momentEnd.diff(momentStart, "days") + 1;
					let timeText;

					{
						/* Checks if `booking` has a duration and store text accordingly */
					}
					if (booking.duration) {
						timeText = `${booking.duration} HR / DAY`;
					} else {
						timeText = `${booking.startTime} - ${booking.endTime}`;
					}

					{
						/* To avoid 0 day events (happens when `booking.end_date` === `booking.start_date`) */
					}
					if (eventDuration === 0) {
						eventDuration = 1;
					}

					maxPossibleLength.current = DAY_WIDTH * eventDuration - 4;

					if (eventDuration > 6) {
						moreThanOneWeek.current = true;
						const numberOfDaysUntilSunday = 6 - day;
						eventDuration = numberOfDaysUntilSunday;
					}

					durationRef.current = eventDuration;
					let maxWidth = DAY_WIDTH * eventDuration - 4;

					return (
						<div
							key={i}
							className={eventClassName}
							style={{ height: 44 }}
							onClick={e => handleEventClick(e, booking.id)}
							ref={eventClassName.includes("event-start") ? eventRef : null}
						>
							{a[0] && (
								<div
									className="event-details"
									style={{
										width: maxWidth,
										height: 40
									}}
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
	}
);
