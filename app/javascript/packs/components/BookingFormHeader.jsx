import React from "react";
import blackCrossSvg from "../images/black-cross.svg";

export const BookingFormHeader = ({ setShowForm }) => {
	return (
		<div className="flex justify-content-between px-3">
			<button type="button" onClick={() => setShowForm(false)}>
				<img src={blackCrossSvg} alt="back" width={16} height={16} />
			</button>
			<h3>New booking</h3>
			<div style={{ width: 28 }}></div>
		</div>
	);
};
