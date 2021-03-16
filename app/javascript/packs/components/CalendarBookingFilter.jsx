import React, { useEffect, useRef } from "react";
import TomSelect from "tom-select";
import { caseInsensitiveSort } from "../../utils/caseInsensitiveSort";
import { STATUSES } from "../../utils/constants";

export const CalendarBookingFilter = ({
	bookings,
	status,
	setStatus,
	bookingIds,
	setBookingIds
}) => {
	const bookingStatusNode = useRef(null);
	const bookingIdNode = useRef(null);

	const handleBookingIdChange = e => {
		setBookingIds(prev => [...new Set([...prev, e.target.value])]);
	};

	useEffect(() => {
		if (
			bookingStatusNode.current &&
			!bookingStatusNode.current.classList.contains("tomselected")
		) {
			new TomSelect(bookingStatusNode.current, {
				plugins: ["remove_button"]
			});
		}
	}, [bookingStatusNode.current]);

	useEffect(() => {
		if (
			bookingIdNode.current &&
			!bookingIdNode.current.classList.contains("tomselected")
		) {
			new TomSelect(bookingIdNode.current);
		}
	}, [bookingIdNode.current]);

	return (
		<>
			<h3 className="textLightBlack">Filter bookings</h3>

			<div className="flex flex-column mb-3">
				<label htmlFor="booking_status" className="textLightBlack mb-1">
					Status
				</label>
				<select
					ref={bookingStatusNode}
					name="booking[status]"
					id="booking_status"
					value={status}
					onChange={e => setStatus(e.target.value)}
				>
					{STATUSES.map((status, i) => (
						<option key={i} value={i - 1}>
							{status[0]?.toUpperCase()}
							{status.substr(1)}
						</option>
					))}
				</select>
				<div className="flex flex-column my-3">
					<label htmlFor="booking_id" className="textLightBlack mb-1">
						Project/Client
					</label>
					<select
						ref={bookingIdNode}
						name="booking[id]"
						id="booking_id"
						value={bookingIds}
						onChange={handleBookingIdChange}
						multiple
					>
						{caseInsensitiveSort(bookings).map(({ title, id }) => (
							<option key={id} value={id}>
								{title}
							</option>
						))}
					</select>
				</div>
			</div>
		</>
	);
};
