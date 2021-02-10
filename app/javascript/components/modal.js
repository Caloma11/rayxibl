export const initModal = () => {
	const toggler = document.getElementById("modal-toggler");
	const content = document.getElementById("modal-content");
	const exit = document.getElementById("modal-exit");

	if (toggler && content) {
		// Do something
		toggler.addEventListener("click", () => {
			content.classList.toggle("none");
		});
	}

	if (exit && content) {
		exit.addEventListener("click", () => {
			content.classList.add("none");
		});
	}
};
