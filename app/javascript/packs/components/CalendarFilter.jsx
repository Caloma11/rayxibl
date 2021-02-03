import React, { useState } from "react";
import axios from "axios";
import filterSvg from "../images/filter.svg";
import crossDarkSvg from "../images/cross-dark.svg";

export const CalendarFilter = ({ setProfiles }) => {
	const [show, setShow] = useState(false);
	const [name, setName] = useState("");
	const [profession, setProfession] = useState("");

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			const params = { profile: { name, profession } };
			const { data } = await axios.get("/api/v1/networks", { params });
			setProfiles(data);
			setShow(false);
		} catch (error) {
			console.log(error);
		}
	};

	const clearFilter = () => {
		setName("");
		setProfession("");
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
						<h3 className="textLightBlack">Filter freelancers</h3>

						<form onSubmit={handleSubmit}>
							<div className="flex flex-column mb-3">
								<label htmlFor="profile_name" className="textLightBlack mb-1">
									Name
								</label>
								<input
									type="text"
									value={name}
									onChange={e => setName(e.target.value)}
									name="profile[name]"
									id="profile_name"
								/>
							</div>

							<div className="flex flex-column mb-3">
								<label
									htmlFor="profile_profession"
									className="textLightBlack mb-1"
								>
									Profession
								</label>
								<input
									type="text"
									value={profession}
									onChange={e => setProfession(e.target.value)}
									name="profile[profession]"
									id="profile_profession"
								/>
							</div>
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
					</section>
				</div>
			)}
		</div>
	);
};
