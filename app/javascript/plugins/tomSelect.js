import TomSelect from "tom-select";

export const initTomSelect = () => {
	const config = {};
	const profileSkills = document.getElementById("profile_skills");

	if (profileSkills) {
		new TomSelect(profileSkills, config);
	}
};
