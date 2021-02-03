import React from "react";

export const Input = ({ name, label, value, setValue }) => {
	return (
		<div className="flex flex-column mb-3">
			<label htmlFor={`profile_${name}`} className="textLightBlack mb-1">
				{label}
			</label>
			<input
				type="text"
				value={value}
				onChange={e => setValue(e.target.value)}
				name={`profile[${name}]`}
				id={`profile_${name}`}
			/>
		</div>
	);
};
