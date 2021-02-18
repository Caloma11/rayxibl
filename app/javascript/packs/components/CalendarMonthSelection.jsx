import React, { useState } from "react";
import { MONTHS } from "../../utils/constants";
import blackCross from "../images/black-cross.svg";
import downChevron from "../images/down-chevron.svg";
import leftArrow from "../images/left-arrow.svg";
import rightArrow from "../images/right-arrow.svg";

export const CalendarMonthSelection = ({ month, setMonth, year, setYear }) => {
	const [show, setShow] = useState(false);

	return (
		<div className="month-selection">
			<div className="flex items-center" onClick={() => setShow(true)}>
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
					<div className="flex w-100 justify-content-between items-center mb-3 pt-2">
						<button
							className="ml-3"
							type="button"
							onClick={() => setShow(false)}
						>
							<img
								src={blackCross}
								width={12}
								height={12}
								alt="Close dropdown"
							/>
						</button>
						<div className="flex">
							<button onClick={() => setYear(prev => prev - 1)}>
								<img
									src={leftArrow}
									alt="previous year"
									width={12}
									height={12}
								/>
							</button>
							<span>{year}</span>
							<button
								className="mr-3"
								onClick={() => setYear(prev => prev + 1)}
							>
								<img src={rightArrow} alt="next year" width={12} height={12} />
							</button>
						</div>
						<button className="opaque noSelect" style={{ width: 30 }}>
							CAL
						</button>
					</div>
					<div className="months-grid">
						{MONTHS.map((mo, i) => (
							<div
								key={i}
								className={`uppercase mx-3 mb-2 month ${
									month === mo ? "current-month" : ""
								}`}
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
