import React from "react";
import paperclipSvg from "../images/paperclip.svg";

export const BookingFormAttachments = ({ setAttachments }) => {
	const handleChange = e => {
		e.persist();
		setAttachments(prevState => [...prevState, ...e.target.files]);
	};

	return (
		<div className="input-wrapper booking-attachments mx-3">
			<label
				htmlFor="booking_attachments"
				className="block my-0 textLightBlack textBetween choose-file uppercase text-center"
			>
				<img
					src={paperclipSvg}
					alt="Add attachment icon"
					width={32}
					height={32}
					className="vertical-align-middle"
				/>{" "}
				Add attachment
			</label>
			<input
				id="booking_attachments"
				name="booking[attachments][]"
				className="none"
				type="file"
				multiple
				onChange={handleChange}
			/>
		</div>
	);
};
