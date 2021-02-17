import React, { useState } from "react";
import moment from "moment";
import { MONTHS } from "../../utils/constants";
import leftArrow from "../images/left-arrow.svg";
import rightArrow from "../images/right-arrow.svg";
import downChevron from "../images/down-chevron.svg";

export const CalendarMonthSelection = () => {
	const today = moment();
	const [month, setMonth] = useState(today.format("MMMM"));
	const [year, setYear] = useState(parseInt(today.format("YYYY"), 10));
	const [show, setShow] = useState(false);

	return (
		<div className="month-selection">
			<div className="flex items-center" onClick={() => setShow(prev => !prev)}>
				<h3 className="uppercase m-0">
					{month} {year}
				</h3>
				<img
					className="ml-2 vertical-align-middle"
					src={downChevron}
					alt="chevron"
					width={12}
					height={12}
				/>
			</div>
			{show && (
				<div className="flex flex-column items-center selector-wrapper">
					<div className="flex">
						<button onClick={() => setYear(prev => prev - 1)}>
							<img src={leftArrow} alt="previous year" width={16} height={16} />
						</button>
						<span>{year}</span>
						<button onClick={() => setYear(prev => prev + 1)}>
							<img src={rightArrow} alt="next year" width={16} height={16} />
						</button>
					</div>
					<div className="months-grid">
						{MONTHS.map((mo, i) => (
							<div
								key={i}
								className="uppercase mx-3 mb-2"
								onClick={() => setMonth(mo)}
							>
								{mo.substr(0, 3)}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
