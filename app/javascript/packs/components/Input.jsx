import React from "react";

export const Input = ({ booking = false, name, label, value, setValue }) => {
	const inputName = attr => (booking ? `booking[${attr}]` : `profile[${attr}]`);

	return (
		<div className="flex flex-column mb-3">
			<label htmlFor={`profile_${name}`} className="textLightBlack mb-1">
				{label}
			</label>
			<input
				type="text"
				value={value}
				onChange={e => setValue(e.target.value)}
				name={inputName(name)}
				id={`profile_${name}`}
			/>
		</div>
	);
};
