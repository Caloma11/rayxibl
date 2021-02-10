import TomSelect from "tom-select";

export const initTomSelect = () => {
	const config = {};
	const profileSkills = document.getElementById("profile_skills");
	const profileExpertise = document.getElementById("profile_expertise");
	const bookingSkills = document.getElementById("booking_skills");
	const bookingExpertise = document.getElementById("booking_expertise");

	if (profileSkills) {
		new TomSelect(profileSkills, config);
	}

	if (profileExpertise) {
		new TomSelect(profileExpertise, config);
	}

	if (bookingSkills) {
		new TomSelect(bookingSkills, config);
	}

	if (bookingExpertise) {
		new TomSelect(bookingExpertise, config);
	}
};
