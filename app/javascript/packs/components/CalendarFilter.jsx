import React, { useState } from "react";
import axios from "axios";
import { CalendarProfileFilter } from "./CalendarProfileFilter";
import filterSvg from "../images/filter.svg";
import crossDarkSvg from "../images/cross-dark.svg";

export const CalendarFilter = ({ bookings, setProfiles }) => {
	const [show, setShow] = useState(false);

	const handleProfileSubmit = async params => {
		try {
			const { data } = await axios.get("/api/v1/networks", { params });
			setProfiles(data);
			setShow(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div id="calendar-filter">
			{!show && (
				<div className="flex justify-content-end m-3">
					<button onClick={() => setShow(prev => !prev)}>
						<img src={filterSvg} alt="filter" width={24} height={24} />
					</button>
				</div>
			)}

			{show && (
				<div className="filter-overlay">
					<section className="px-3 flex justify-content-between items-center header">
						<button className="p-0" onClick={() => setShow(false)}>
							<img src={crossDarkSvg} alt="exit" />
						</button>
						<p>FREELANCERS</p>
						<button style={{ width: 32 }}> </button>
					</section>
					<section className="content">
						<CalendarProfileFilter
							bookings={bookings}
							handleSubmit={handleProfileSubmit}
						/>
					</section>
				</div>
			)}
		</div>
	);
};
