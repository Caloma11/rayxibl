export const filtering = () => {
	const filterButton = document.getElementById("filter-trigger");
	const filterContent = document.getElementById("filter-content");
	const filterExit = document.querySelector(".filter-exit");

	if (filterButton) {
		filterButton.addEventListener("click", () => {
			filterContent.classList.remove("none");
		});
	}

	if (filterExit) {
		filterExit.addEventListener("click", () => {
			filterContent.classList.add("none");
		});
	}
};

export const jobApplicationFilter = () => {
	const trigger = document.getElementById("job-application-trigger");
	const content = document.getElementById("job-application-content");
	const upChevron = document.getElementById("up");
	const downChevron = document.getElementById("down");
	const jobCardFilters = document.querySelectorAll(".job-card");
	const profileJobIdInput = document.getElementById("profile_job_id");
	let activeJobIds = [];

	if (trigger) {
		trigger.addEventListener("click", () => {
			upChevron.classList.toggle("none");
			downChevron.classList.toggle("none");
			trigger.classList.toggle("expanded");
			content.classList.toggle("opaque");
			content.classList.toggle("h-0");
		});
	}

	if (jobCardFilters.length <= 0) return;

	jobCardFilters.forEach(card => {
		card.addEventListener("click", () => {
			const { jobId } = card.dataset;
			card.classList.toggle("selected");
			if (activeJobIds.includes(parseInt(jobId, 10))) {
				activeJobIds = activeJobIds.filter(ele => ele !== parseInt(jobId, 10));
			} else {
				activeJobIds.push(parseInt(jobId, 10));
			}

			profileJobIdInput.value = activeJobIds;
		});
	});
};

export const conversationFilter = () => {
	let activeJobIds = [];
	const profileJobIdInput = document.getElementById("profile_job_id");
	const jobCards = document.querySelectorAll(".job-simple-card");

	if (jobCards.length <= 0) return;

	jobCards.forEach(jobCard => {
		jobCard.addEventListener("click", () => {
			const indicatorCheckbox = jobCard.querySelector(".indicator");
			jobCard.classList.toggle("selected");
			const { jobId } = jobCard.dataset;
			const numberJobId = parseInt(jobId, 10);
			indicatorCheckbox.checked = !indicatorCheckbox.checked;

			if (activeJobIds.includes(numberJobId)) {
				activeJobIds = activeJobIds.filter(ele => ele !== numberJobId);
			} else {
				activeJobIds.push(numberJobId);
			}

			profileJobIdInput.value = activeJobIds;
		});
	});
};
