import React, { useState } from "react";
import downChevronBlue from "../images/down-chevron-blue.svg";
import upChevronGray from "../images/up-chevron-gray.svg";
import { Input } from "./Input";
import { CalendarBookingFilter } from "./CalendarBookingFilter";
import { EXPERTISES } from "../../utils/constants";

const CalendarAdvancedFilter = ({ states, expertise }) => {
	const { value, setExpertise, name, label } = expertise;

	return (
		<div>
			{states.map((state, i) => {
				const [value, setValue, name, label] = state;

				return (
					<Input
						key={i}
						name={name}
						label={label}
						value={value}
						setValue={setValue}
					/>
				);
			})}
			<div className="flex flex-column mb-3">
				<label className="textLightBlack mb-1" htmlFor={`profile_${name}`}>
					{label}
				</label>
				<select
					id={`profile_${name}`}
					name={`profile_${name}`}
					onChange={e => setExpertise(e.target.value)}
					value={value}
				>
					{EXPERTISES.map((e, i) => (
						<option key={i} value={i - 1}>
							{e[0]?.toUpperCase()}
							{e.substr(1)}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export const CalendarProfileFilter = ({
	bookings,
	handleSubmit,
	setFilterCount,
	setShow
}) => {
	const [name, setName] = useState("");
	const [profession, setProfession] = useState("");
	const [skills, setSkills] = useState("");
	const [location, setLocation] = useState("");
	const [expertise, setExpertise] = useState("");
	const [status, setStatus] = useState([]);
	const [bookingIds, setBookingIds] = useState([]);
	const [showAdvanced, setShowAdvanced] = useState(false);

	const clearFilter = () => {
		setName("");
		setProfession("");
		setSkills("");
		setLocation("");
		setExpertise("");
		setStatus("");
		setBookingIds([]);
		setFilterCount(0);
		setShow(false);
		handleSubmit({});
	};

	const toggleAdvancedFilter = () => {
		setShowAdvanced(prevState => !prevState);
	};

	const localHandleSubmit = e => {
		e.preventDefault();

		const params = {
			profile: { name, profession, skills, location, expertise },
			booking: { status, id: bookingIds }
		};

		let localFilterCount = 0;

		if (name !== "") localFilterCount += 1;
		if (profession !== "") localFilterCount += 1;
		if (skills !== "") localFilterCount += 1;
		if (location !== "") localFilterCount += 1;
		if (expertise !== "") localFilterCount += 1;
		if (status.length > 0) localFilterCount += 1;
		if (bookingIds.length > 0) localFilterCount += 1;

		setFilterCount(localFilterCount);
		handleSubmit(params);
	};

	return (
		<>
			<h3 className="textLightBlack">Filter freelancers</h3>

			<form onSubmit={localHandleSubmit}>
				<Input name="name" label="Name" value={name} setValue={setName} />
				<Input
					name="profession"
					label="Profession"
					value={profession}
					setValue={setProfession}
				/>
				<div className="flex justify-content-center">
					<button
						id="show-advanced"
						type="button"
						className={`btn btn-float blue text-center textSm mb-3 ${
							showAdvanced ? "active" : ""
						}`}
						onClick={toggleAdvancedFilter}
					>
						More{" "}
						<img
							src={showAdvanced ? upChevronGray : downChevronBlue}
							alt="down chevron"
							width={10}
							height={10}
							className="ml-1 vertical-align-middle"
						/>
					</button>
				</div>
				{showAdvanced && (
					<CalendarAdvancedFilter
						states={[
							[skills, setSkills, "skill_list", "Key skills (comma separated)"],
							[location, setLocation, "location", "Location"]
						]}
						expertise={{
							value: expertise,
							setExpertise: setExpertise,
							name: "expertise",
							label: "Experience Level"
						}}
					/>
				)}

				<CalendarBookingFilter
					bookings={bookings}
					status={status}
					setStatus={setStatus}
					bookingIds={bookingIds}
					setBookingIds={setBookingIds}
				/>

				<div className="flex justify-content-between my-2 mx-4">
					<button
						onClick={clearFilter}
						type="button"
						className="btn btn-float red"
					>
						Clear
					</button>
					<button type="button" className="btn btn-float blue">
						Save
					</button>
				</div>
				<button className="w-100 btn btn-primary" type="submit">
					Show results
				</button>
			</form>
		</>
	);
};
