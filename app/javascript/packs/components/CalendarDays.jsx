import React from "react";
import moment from "moment";
import { CalendarDay } from "./CalendarDay";

export const CalendarDays = ({
	profile,
	numberOfWeeks,
	data,
	setShowForm,
	setFormDetails,
	first = false
}) => {
	const handleDayClick = ({ week, day }) => {
		const date = data[week][day];
		const formDetails = { profile, date };
		setFormDetails(formDetails);
		setShowForm(true);
	};

	return (
		<div className={`daysCollection ${first ? "first-row" : ""}`}>
			{numberOfWeeks.map((week, j) => {
				return week.map((_, k) => {
					try {
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
								bookings={profile.bookings}
							/>
						);
					} catch (error) {
						console.log(error);
					}
				});
			})}
		</div>
	);
};
