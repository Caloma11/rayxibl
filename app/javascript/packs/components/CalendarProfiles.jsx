import React from "react";

export const CalendarProfiles = ({ profiles }) => {
	return (
		<div className="profiles">
			<div className="week blank"></div>
			{profiles.map(profile => (
				<div key={profile.id} className="week profile">
					<p>{profile.name}</p>
				</div>
			))}
		</div>
	);
};
