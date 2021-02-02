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
