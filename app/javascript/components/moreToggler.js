export const moreToggler = () => {
	const trigger = document.querySelector(".trigger");
	const actionsContainer = document.querySelector(".actions-container");

	if (trigger && actionsContainer) {
		trigger.addEventListener("click", () => {
			actionsContainer.classList.toggle("none");
		});
	}
};
