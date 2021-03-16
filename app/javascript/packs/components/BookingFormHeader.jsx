import React from "react";
import blackCrossSvg from "../images/black-cross.svg";

export const BookingFormHeader = ({ setShowForm, profile }) => {
	return (
		<div className="booking-form-header">
			<div className="flex justify-content-between">
				<button type="button" onClick={() => setShowForm(false)}>
					<img src={blackCrossSvg} alt="back" width={14} height={14} />
				</button>
				<h3 className="semi-bold uppercase textBetween textDarkGray">
					New booking
				</h3>
				<div style={{ width: 28 }}></div>
			</div>

			<div className="flex items-center profile">
				<img
					className="avatar avatar-square medium"
					src={profile.avatar}
					alt={`${profile.displayName}'s avatar`}
				/>
				<div className="ml-3">
					<p className="mt-0 mb-1">{profile.displayName}</p>
					<span className="textBetween">
						{profile.profession}, {profile.location}
					</span>
				</div>
			</div>
		</div>
	);
};
