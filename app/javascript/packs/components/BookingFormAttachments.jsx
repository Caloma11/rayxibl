import React from "react";

export const BookingFormAttachments = () => {
	return (
		<>
			<div className="input-wrapper">
				<label htmlFor="booking_attachments">Attachments</label>
				<input
					id="booking_attachments"
					name="booking[attachments][]"
					type="file"
					multiple
				/>
			</div>
		</>
	);
};
