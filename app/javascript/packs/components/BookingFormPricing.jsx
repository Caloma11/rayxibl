import React from "react";
import { PRICE_TYPES } from "../../utils/constants";

const CheckMark = () => (
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
);

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
			<div className="flex billable-wrapper">
				<label htmlFor="booking_billable" className="checkbox-container">
					Billable
					<input
						type="checkbox"
						name="booking[billable]"
						className="mr-2"
						id="booking_billable"
					/>
					<span
						className="checkmark"
						onClick={() => setBillable(prev => !prev)}
					>
						<CheckMark />
					</span>
				</label>
			</div>
			{billable && (
				<div className="input-wrapper">
					<label
						htmlFor="booking_price"
						className="block mb-1 textLightBlack textBetween"
					>
						Price rate
					</label>
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
