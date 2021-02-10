export const moreToggler = () => {
	const trigger = document.querySelector(".trigger");
	const actionsContainer = document.querySelector(".actions-container");

	if (trigger && actionsContainer) {
		trigger.addEventListener("click", e => {
			actionsContainer.classList.toggle("none");
			e.stopPropagation();
		});

		actionsContainer.addEventListener("click", e => {
			e.stopPropagation();
		});

		document.body.addEventListener("click", e => {
			if (!actionsContainer.classList.contains("none")) {
				actionsContainer.classList.add("none");
			}
		});
	}
};
