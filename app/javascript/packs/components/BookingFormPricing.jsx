import React from "react";
import checkmarkSvg from "../images/checkmark.svg";
import { PRICE_TYPES } from "../../utils/constants";

export const BookingFormPricing = ({
	billable,
	setBillable,
	price,
	setPrice,
	priceType,
	setPriceType,
	totalPrice,
	errors
}) => {
	return (
		<>
			<div className="checkbox-wrapper">
				<div
					className={`custom-checkbox ${billable ? "checked" : ""}`}
					onClick={() => setBillable(prevState => !prevState)}
				>
					<img src={checkmarkSvg} alt="checked" />
				</div>
				<input
					id="booking_billable"
					name="booking[billable]"
					type="hidden"
					value={billable}
				/>
				<label htmlFor="booking_billable">Billable</label>
			</div>
			{billable && (
				<div className="input-wrapper">
					<label htmlFor="booking_price">Price rate</label>
					<div className="flex items-center">
						<input
							id="booking_price"
							name="booking[price]"
							type="number"
							value={price}
							onChange={e => setPrice(e.target.value)}
							className={`mr-3 ${"price" in errors ? "error" : ""}`}
							style={{ width: 120 }}
						/>
						<select
							id="booking_price_type"
							name="booking[price_type]"
							value={priceType}
							onChange={e => setPriceType(e.target.value)}
							className={`mr-3 ${"price_type" in errors ? "error" : ""}`}
						>
							{PRICE_TYPES.map(({ text, value }) => (
								<option value={value} key={value}>
									{text}
								</option>
							))}
						</select>
						<span className="total-price">Total: ${totalPrice || 0}</span>
					</div>
				</div>
			)}
		</>
	);
};
