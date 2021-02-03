import TomSelect from "tom-select";

export const initTomSelect = () => {
	const config = {};
	const profileSkills = document.getElementById("profile_skills");
	const profileExpertise = document.getElementById("profile_expertise");

	if (profileSkills) {
		new TomSelect(profileSkills, config);
	}

	if (profileExpertise) {
		new TomSelect(profileExpertise, config);
	}
};
