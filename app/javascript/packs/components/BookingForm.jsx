import React, { useState, useEffect } from "react";
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

	const { profile, date } = formDetails;

	// console.log({ profile, date });

	const handleSubmit = e => {
		e.preventDefault();
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
		<div>
			<BookingFormHeader setShowForm={setShowForm} />
			<form className="bookingForm" onSubmit={handleSubmit}>
				<div className="px-3">
					<div className="input-wrapper">
						<label htmlFor="booking_title">Project/Client</label>
						<input
							id="booking_title"
							name="booking[title]"
							type="text"
							value={title}
							onChange={e => setTitle(e.target.value)}
							placeholder="Ecommerce shoot"
						/>
					</div>
					<div className="input-wrapper">
						<label htmlFor="booking_description">Description</label>
						<textarea
							id="booking_description"
							value={description}
							onChange={e => setDescription(e.target.value)}
							placeholder="Subtly charming bacon evangelist. Coffee guru. Twitter junkie. Lifelong travel ninja. Subtly charming bacon evangelist. Coffee guru. Twitter junkie. Lifelong travel ninja."
							rows={5}
						></textarea>
					</div>
					<BookingFormDates
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
					/>
					<BookingFormPricing
						billable={billable}
						setBillable={setBillable}
						price={price}
						setPrice={setPrice}
						priceType={priceType}
						setPriceType={setPriceType}
						totalPrice={totalPrice}
					/>
					<BookingFormAttachments />
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
