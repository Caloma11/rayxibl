import React from "react";

export const BookingFormAttachments = ({ setAttachments }) => {
	const handleChange = e => {
		e.persist();
		setAttachments(prevState => [...prevState, ...e.target.files]);
	};

	return (
		<>
			<div className="input-wrapper">
				<label htmlFor="booking_attachments">Attachments</label>
				<input
					id="booking_attachments"
					name="booking[attachments][]"
					type="file"
					multiple
					onChange={handleChange}
				/>
			</div>
		</>
	);
};
