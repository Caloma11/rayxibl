import TomSelect from "tom-select";

const customizeTs = ts => {
	ts.on("item_add", () => {
		if (ts.caretPos >= 3) {
			ts.control.classList.add("flex", "flex-wrap", "big");
		}

		ts.control_input.value = "";
	});
	ts.on("item_remove", () => {
		if (ts.caretPos < 3) {
			ts.control.classList.remove("flex", "flex-wrap", "big");
		}
	});
};

export const initTomSelect = () => {
	const config = {
		plugins: ["remove_button"]
	};
	const profileSkills = document.getElementById("profile_skills");
	const profileExpertise = document.getElementById("profile_expertise");
	const profileProfession = document.getElementById("profile_profession");
	const bookingSkills = document.getElementById("booking_skills");
	const bookingExpertise = document.getElementById("booking_expertise");
	const jobExpertise = document.getElementById("job_expertise");

	if (profileSkills) {
		const ts = new TomSelect(profileSkills, config);
		customizeTs(ts);
	}

	if (
		profileProfession &&
		!profileProfession.classList.contains("no-tomselect")
	) {
		const ts = new TomSelect(profileProfession, config);
		customizeTs(ts);
	}

	if (profileExpertise) {
		const ts = new TomSelect(profileExpertise, config);
		customizeTs(ts);
	}

	if (bookingSkills) {
		new TomSelect(bookingSkills, config);
	}

	if (bookingExpertise) {
		const ts = new TomSelect(bookingExpertise, config);
		customizeTs(ts);
	}

	if (jobExpertise) {
		const ts = new TomSelect(jobExpertise, config);
		customizeTs(ts);
	}
};
