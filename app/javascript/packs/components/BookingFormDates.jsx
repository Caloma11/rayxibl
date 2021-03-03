import React, { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
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
	setEndDate,
	weekends,
	setWeekends,
	errors
}) => {
	const datesRef = useRef(null);

	useEffect(() => {
		if (chosenDate) {
			setStartDate(chosenDate);
		}

		if (datesRef.current) {
			const [year, month, day] = chosenDate
				.split("-")
				.map(ele => parseInt(ele, 10));
			const chosenDay = new Date(year, month - 1, day);
			flatpickr(datesRef.current, {
				disableMobile: true,
				mode: "range",
				dateFormat: "d-m-Y",
				altFormat: "d M",
				altInput: true,
				locale: {
					rangeSeparator: "  -  "
				},
				defaultDate: [chosenDay, chosenDay],
				onChange: ([flatStartDate, flatEndDate]) => {
					if (flatStartDate && flatEndDate) {
						setStartDate(flatStartDate);
						setEndDate(flatEndDate);
					}
				}
			});
		}
	}, []);

	useEffect(() => {
		if (specificHour) {
			setDuration(0);
		} else {
			setStartTime("");
			setEndTime("");
		}
	}, [specificHour]);

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
							<label htmlFor="booking_start_time">Starting time</label>
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
							<label htmlFor="booking_end_time">Ending time</label>
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
						<label htmlFor="booking_duration">Duration (in hours)</label>
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
			<div className="flex mb-3 items-center">
				<input
					id="booking_start_date"
					name="booking[start_date]"
					type="hidden"
					value={startDate}
					onChange={e => setStartDate(e.target.value)}
					className={Object.keys(errors).includes("end_date") ? "error" : ""}
				/>
				<input
					id="booking_end_date"
					name="booking[end_date]"
					type="hidden"
					value={endDate}
					onChange={e => setEndDate(e.target.value)}
					className={Object.keys(errors).includes("end_date") ? "error" : ""}
				/>
				<div className="input-wrapper" style={{ marginBottom: 0 }}>
					<label htmlFor="new-booking-datepickr" className="block textGray">
						Dates
					</label>
					<input
						id="new-booking-datepickr"
						ref={datesRef}
						type="text"
						name="dates"
						className="mb-2 w-100 datepicker border-box"
					/>
				</div>
				<div className="flex items-center mt-2 ml-3">
					<input
						name="booking[weekends]"
						id="booking_weekends"
						type="checkbox"
						value={weekends}
						className="mr-2 big"
						onChange={() => setWeekends(prev => !prev)}
					/>
					<label htmlFor="booking_weekends" className="block textGray">
						Incl. weekends
					</label>
				</div>
			</div>
		</>
	);
};
