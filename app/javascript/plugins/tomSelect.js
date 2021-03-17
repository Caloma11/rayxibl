import TomSelect from "tom-select";

const customizeTs = ts => {
	// ts.control_input.style.width = "0px";
	ts.on("item_add", () => {
		if (ts.caretPos >= 3) {
			ts.control.classList.add("flex", "flex-wrap", "big");
		}
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
	const bookingSkills = document.getElementById("booking_skills");
	const bookingExpertise = document.getElementById("booking_expertise");
	const jobExpertise = document.getElementById("job_expertise");

	if (profileSkills) {
		new TomSelect(profileSkills, config);
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
