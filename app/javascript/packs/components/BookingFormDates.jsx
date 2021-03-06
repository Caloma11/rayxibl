import flatpickr from "flatpickr";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import { TIME_LIST, DURATION_LIST } from "../../utils/constants";

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
				altInputClass: "flatpickr-customize",
				locale: {
					rangeSeparator: "  -  "
				},
				defaultDate: [chosenDay, chosenDay],
				onChange: ([flatStartDate, flatEndDate]) => {
					if (flatStartDate && flatEndDate) {
						const startDate = moment(flatStartDate);
						const endDate = moment(flatEndDate);
						setStartDate(startDate.format("ddd MMM D YYYY"));
						setEndDate(endDate.format("ddd MMM D YYYY"));
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
			<label
				className="block mb-1 textLightBlack textBetween"
				htmlFor="booking_time"
			>
				Hours per day
			</label>
			<div className="flex justify-content-center items-end mb-3">
				<div className="flex w-100">
					{specificHour ? (
						<div className="flex flex-column">
							<div className="flex items-center">
								<select
									id="booking_start_time"
									name="booking[start_time]"
									value={startTime}
									onChange={e => setStartTime(e.target.value)}
								>
									{TIME_LIST.map((time, i) => (
										<option value={time} key={i}>
											{time}
										</option>
									))}
								</select>
								<span className="self-centered mx-2"> - </span>
								<select
									id="booking_end_time"
									name="booking[end_time]"
									value={endTime}
									onChange={e => setEndTime(e.target.value)}
								>
									{TIME_LIST.map((time, i) => (
										<option value={time} key={i}>
											{time}
										</option>
									))}
								</select>
							</div>
						</div>
					) : (
						<select
							id="booking_duration"
							name="booking[duration]"
							className="w-100"
							value={duration}
							onChange={e => setDuration(e.target.value)}
							style={{ width: 144 }}
						>
							{DURATION_LIST.map(ele => (
								<option value={ele} key={ele}>
									{ele}
								</option>
							))}
						</select>
					)}
				</div>
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
			</div>
			<label
				htmlFor="new-booking-datepickr"
				className="block mb-1 textLightBlack textBetween"
			>
				Dates
			</label>
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
				<div className="flex items-center">
					<div className="input-wrapper" style={{ marginBottom: 0 }}>
						<input
							id="new-booking-datepickr"
							ref={datesRef}
							type="text"
							name="dates"
							className="datepicker border-box"
						/>
					</div>
					<div className="flex items-center ml-3">
						<label htmlFor="booking_weekends" className="checkbox-container">
							Incl. weekends
							<input
								type="checkbox"
								name="booking[weekends]"
								className="mr-2"
								id="booking_weekends"
								defaultValue={weekends}
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
			</div>
		</>
	);
};
