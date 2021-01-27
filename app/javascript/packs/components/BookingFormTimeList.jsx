import React from "react";
import { TIME_LIST } from "../../utils/constants";

export const BookingFormTimeList = () => {
	return (
		<datalist id="booking-form-time-list">
			{TIME_LIST.map((time, i) => (
				<option value={time} key={i} />
			))}
		</datalist>
	);
};
