import React from "react";

const CalendarProfile = ({ avatar, displayName, profession }) => {
	const professionTruncated =
		profession.length > 12 ? `${profession.substr(0, 10)}...` : profession;

	return (
		<div className="week profile">
			<img
				className="avatar avatar-square"
				src={avatar}
				alt={`${displayName}'s avatar`}
			/>
			<p className="profile-name">{displayName}</p>
			<span className="profile-profession">{professionTruncated}</span>
		</div>
	);
};

export const CalendarProfiles = ({ profiles, moveToToday }) => {
	return (
		<div className="profiles">
			<div className="week profile today" onClick={moveToToday}>
				<span className="uppercase">Today</span>
			</div>
			{profiles.map(profile => (
				<CalendarProfile {...profile} key={profile.id} />
			))}
		</div>
	);
};
