import React from "react";
import blackCrossSvg from "../images/black-cross.svg";

export const BookingFormHeader = ({ setShowForm, profile }) => {
	return (
		<div className="booking-form-header">
			<div className="flex justify-content-between">
				<button type="button" onClick={() => setShowForm(false)}>
					<img src={blackCrossSvg} alt="back" width={16} height={16} />
				</button>
				<h3>New booking</h3>
				<div style={{ width: 28 }}></div>
			</div>

			<div className="flex items-center profile">
				<img
					className="avatar avatar-square"
					src={profile.avatar}
					alt={`${profile.displayName}'s avatar`}
				/>
				<div className="ml-3">
					<p className="mt-0 mb-1">{profile.displayName}</p>
					<span>
						{profile.profession}, {profile.location}
					</span>
				</div>
			</div>
		</div>
	);
};
