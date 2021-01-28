import React, { useState } from "react";
import moment from "moment";
import { CalendarDay } from "./CalendarDay";

export const CalendarDays = ({
	profile,
	numberOfWeeks,
	data,
	setShowForm,
	setFormDetails
}) => {
	const [bookings, setBookings] = useState(profile.bookings);

	const handleDayClick = ({ week, day }) => {
		const date = data[week][day];
		const formDetails = { profile, date };
		setFormDetails(formDetails);
		setShowForm(true);
	};

	return (
		<div className="daysCollection">
			{numberOfWeeks.map((week, j) => {
				return week.map((_, k) => {
					const dayOfWeek = data[j][k];
					const today = dayOfWeek.isSame(moment(), "day");

					return (
						<CalendarDay
							handleDayClick={handleDayClick}
							dayOfWeek={dayOfWeek}
							today={today}
							week={j}
							day={k}
							key={`${j}_${k}`}
							bookings={bookings}
						/>
					);
				});
			})}
		</div>
	);
};