import React from "react";

const CalendarProfile = ({ avatar, displayName, profession }) => {
	return (
		<div className="week profile">
			<img
				className="avatar avatar-circle"
				src={avatar}
				alt={`${displayName}'s avatar`}
			/>
			<p>{displayName}</p>
			<span>{profession}</span>
		</div>
	);
};

export const CalendarProfiles = ({ profiles }) => {
	return (
		<div className="profiles">
			<div className="week profile today">
				<span className="uppercase">Today</span>
			</div>
			{profiles.map(profile => (
				<CalendarProfile {...profile} key={profile.id} />
			))}
		</div>
	);
};
