import React from "react";
import moment from "moment";

export const CalendarDays = ({
	profile,
	numberOfWeeks,
	data,
	setShowForm,
	setFormDetails
}) => {
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
					const today = data[j][k].isSame(moment(), "day") ? "today" : "";

					return (
						<div
							key={`${j}_${k}`}
							className={`day ${today}`}
							onClick={() => handleDayClick({ week: j, day: k })}
						></div>
					);
				});
			})}
		</div>
	);
};
