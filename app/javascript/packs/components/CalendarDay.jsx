import React from "react";

export const CalendarDay = ({
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
					return (
						<div
							key={`${j}_${k}`}
							className="day"
							onClick={() => handleDayClick({ week: j, day: k })}
						></div>
					);
				});
			})}
		</div>
	);
};
