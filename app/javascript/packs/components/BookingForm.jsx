import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { generateTotalPrice } from "../../utils/generateTotalPrice";
import { BookingFormDates } from "./BookingFormDates";
import { BookingFormHeader } from "./BookingFormHeader";
import { BookingFormPricing } from "./BookingFormPricing";
import paperPlaneSvg from "../images/paper-plane.svg";
import { BookingFormAttachments } from "./BookingFormAttachments";

export const BookingForm = ({ setShowForm, formDetails }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [duration, setDuration] = useState(0);
	const [specificHour, setSpecificHour] = useState(true);
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [billable, setBillable] = useState(false);
	const [price, setPrice] = useState("");
	const [priceType, setPriceType] = useState(-1);
	const [totalPrice, setTotalPrice] = useState(null);
	const [attachments, setAttachments] = useState([]);
	const [errors, setErrors] = useState({});
	const formRef = useRef(null);

	const { profile, date } = formDetails;

	const handleSubmit = async e => {
		e.preventDefault();

		const formData = new FormData(formRef.current);
		formData.append("booking[profile_id]", profile.id);
		const { data } = await axios.post("/api/v1/bookings", formData);
		if ("errors" in data) {
			setErrors(data.errors);
		}
		// window.location = "/schedule";
	};

	// useEffect(() => {
	// 	let allFilled = startDate && endDate;
	// 	if (specificHour) {
	// 		allFilled = allFilled && startTime && endTime;
	// 	} else {
	// 		allFilled = allFilled && duration;
	// 	}

	// 	if (billable) {
	// 		allFilled = allFilled && price && priceType;
	// 	}

	// 	if (!!allFilled) {
	// 		const calculatedTotalPrice = generateTotalPrice({
	// 			startDate,
	// 			endDate,
	// 			startTime,
	// 			endTime,
	// 			price: parseInt(price, 10),
	// 			priceType: parseInt(priceType, 10),
	// 			duration: parseInt(duration, 10),
	// 			billable
	// 		});

	// 		console.log({ calculatedTotalPrice });
	// 	}
	// }, [
	// 	startDate,
	// 	endDate,
	// 	startTime,
	// 	endTime,
	// 	price,
	// 	priceType,
	// 	duration,
	// 	billable
	// ]);

	return (
		<div id="booking-form-container">
			<BookingFormHeader setShowForm={setShowForm} profile={profile} />
			<form ref={formRef} className="bookingForm" onSubmit={handleSubmit}>
				<div className="px-3">
					<div className="input-wrapper">
						<label htmlFor="booking_title">Project/Client</label>
						<input
							id="booking_title"
							name="booking[title]"
							type="text"
							value={title}
							onChange={e => setTitle(e.target.value)}
							className={"title" in errors ? "error" : ""}
						/>
					</div>
					<div className="input-wrapper">
						<label htmlFor="booking_description">Description</label>
						<textarea
							id="booking_description"
							name="booking[description]"
							value={description}
							onChange={e => setDescription(e.target.value)}
							rows={5}
							className={"description" in errors ? "error" : ""}
						></textarea>
					</div>
					<BookingFormDates
						chosenDate={date.format("YYYY-MM-DD")}
						specificHour={specificHour}
						setSpecificHour={setSpecificHour}
						startTime={startTime}
						setStartTime={setStartTime}
						endTime={endTime}
						setEndTime={setEndTime}
						duration={duration}
						setDuration={setDuration}
						startDate={startDate}
						setStartDate={setStartDate}
						endDate={endDate}
						setEndDate={setEndDate}
						errors={errors}
					/>
					<BookingFormPricing
						billable={billable}
						setBillable={setBillable}
						price={price}
						setPrice={setPrice}
						priceType={priceType}
						setPriceType={setPriceType}
						totalPrice={totalPrice}
						errors={errors}
					/>
					<BookingFormAttachments setAttachments={setAttachments} />
				</div>
				<div className="separator"></div>
				<div className="px-3">
					<button
						type="submit"
						className="btn btn-primary w-100 flex items-center"
					>
						<img
							src={paperPlaneSvg}
							alt="send request"
							width={24}
							height={24}
						/>{" "}
						Send request
					</button>
				</div>
			</form>
		</div>
	);
};
