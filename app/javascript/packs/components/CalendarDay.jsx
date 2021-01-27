import React from "react";

export const CalendarDay = ({ handleDayClick, today, week, day }) => {
	return (
		<div
			className={`day ${today}`}
			onClick={() => handleDayClick({ week, day })}
		></div>
	);
};
