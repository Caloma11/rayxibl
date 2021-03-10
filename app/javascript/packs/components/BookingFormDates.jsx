import React, { useEffect, useRef, useState } from "react";
import flatpickr from "flatpickr";

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
	const [time, setTime] = useState("");
	const datesRef = useRef(null);
	const startTimeRef = useRef(null);
	const endTimeRef = useRef(null);
	const timeRef = useRef(null);
	const timeWrapperRef = useRef(null);
	const startTimeFlat = useRef(null);
	const endTimeFlat = useRef(null);

	const handleTimeClick = e => {
		e.preventDefault();
		startTimeFlat.current.open();
	};

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

		const timepickerOptions = {
			disableMobile: true,
			noCalendar: true,
			enableTime: true,
			time_24hr: true,
			positionElement: timeWrapperRef.current
		};

		if (endTimeRef.current) {
			endTimeFlat.current = flatpickr(endTimeRef.current, {
				...timepickerOptions,
				onClose: (_, time) => {
					setTime(prev => `${prev} - ${time}`);
					setEndTime(time);
				}
			});
		}

		if (startTimeRef.current) {
			startTimeFlat.current = flatpickr(startTimeRef.current, {
				...timepickerOptions,
				onClose: () => endTimeFlat.current.open(),
				onChange: (_, newTime) => {
					setTime(newTime);
					setStartTime(newTime);
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
			<div className="flex flex-row-reverse justify-content-between items-end">
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
							<div className="input-wrapper mb-0 mr-3" ref={timeWrapperRef}>
								<label className="block textGray nowrap" htmlFor="booking_time">
									Hours per day
								</label>
								<input
									id="booking_time"
									className="w-100"
									ref={timeRef}
									onClick={handleTimeClick}
									defaultValue={time}
								/>
								<input
									id="booking_start_time"
									name="booking[start_time]"
									type="time"
									value={startTime}
									onChange={e => setStartTime(e.target.value)}
									ref={startTimeRef}
									className="none"
								/>
							</div>
							<input
								id="booking_end_time"
								name="booking[end_time]"
								type="time"
								value={endTime}
								onChange={e => setEndTime(e.target.value)}
								ref={endTimeRef}
								className="none"
							/>
						</>
					) : (
						<div className="input-wrapper mb-0 mr-3">
							<label htmlFor="booking_duration">Hours per day</label>
							<input
								id="booking_duration"
								name="booking[duration]"
								type="number"
								value={duration}
								onChange={e => setDuration(e.target.value)}
								className="w-100"
							/>
						</div>
					)}
				</div>
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
					<label htmlFor="booking_weekends" className="checkbox-container">
						Incl. weekends
						<input
							type="checkbox"
							name="booking[weekends]"
							className="mr-2"
							id="booking_weekends"
						/>
						<span
							className="checkmark"
							onClick={() => setWeekends(prev => !prev)}
						>
							<svg
								width="15"
								height="11"
								viewBox="0 0 15 11"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M11.7058 0.42315C12.3005 -0.153556 13.2502 -0.138946 13.8269 0.455782C14.4036 1.05051 14.389 2.00015 13.7942 2.57685L6.05985 10.0768C5.47802 10.641 4.55324 10.641 3.97141 10.0768L0.455783 6.66776C-0.138946 6.09105 -0.153556 5.14142 0.423151 4.54669C0.999857 3.95196 1.94949 3.93735 2.54422 4.51406L5.01563 6.91057L11.7058 0.42315Z"
									fill="white"
								/>
							</svg>
						</span>
					</label>
				</div>
			</div>
		</>
	);
};
