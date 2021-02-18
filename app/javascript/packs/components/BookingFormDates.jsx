import React, { useEffect } from "react";
import { BookingFormTimeList } from "./BookingFormTimeList";

export const BookingFormDates = ({
	chosenDate,
	specificHour,
	setSpecificHour,
	startTime,
	setStartTime,
	endTime,
	setEndTime,
	duration,
	setDuration,
	startDate,
	setStartDate,
	endDate,
	setEndDate
}) => {
	useEffect(() => {
		if (chosenDate) {
			setStartDate(chosenDate);
		}
	}, []);

	return (
		<>
			<div className="duration-toggler">
				<button
					type="button"
					className={`btn ${specificHour ? "" : "btn-white"}`}
					onClick={() => setSpecificHour(false)}
				>
					Duration
				</button>
				<button
					type="button"
					className={`btn ${specificHour ? "btn-white" : ""}`}
					onClick={() => setSpecificHour(true)}
				>
					Specific
				</button>
			</div>
			<div className="flex">
				{specificHour ? (
					<>
						<div className="input-wrapper mr-3">
							<label htmlFor="booking_start_time">Start time</label>
							<input
								id="booking_start_time"
								name="booking[start_time]"
								type="time"
								value={startTime}
								onChange={e => setStartTime(e.target.value)}
								list="booking-form-time-list"
							/>
						</div>
						<div className="input-wrapper mr-3">
							<label htmlFor="booking_end_time">End time</label>
							<input
								id="booking_end_time"
								name="booking[end_time]"
								type="time"
								value={endTime}
								onChange={e => setEndTime(e.target.value)}
								list="booking-form-time-list"
							/>
						</div>
					</>
				) : (
					<div className="input-wrapper">
						<label htmlFor="booking_duration">Hours per day</label>
						<input
							id="booking_duration"
							name="booking[duration]"
							type="number"
							value={duration}
							onChange={e => setDuration(e.target.value)}
							list="booking-form-duration-list"
						/>
					</div>
				)}
				<BookingFormTimeList />
			</div>
			<div className="flex">
				<div className="input-wrapper mr-3">
					<label htmlFor="booking_start_date">Start date</label>
					<input
						id="booking_start_date"
						name="booking[start_date]"
						type="date"
						value={startDate}
						onChange={e => setStartDate(e.target.value)}
					/>
				</div>
				<div className="input-wrapper">
					<label htmlFor="booking_end_date">End date</label>
					<input
						id="booking_end_date"
						name="booking[end_date]"
						type="date"
						value={endDate}
						onChange={e => setEndDate(e.target.value)}
					/>
				</div>
			</div>
		</>
	);
};
