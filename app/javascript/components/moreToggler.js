export const moreToggler = () => {
	const trigger = document.querySelector(".trigger");
	const actionsContainer = document.querySelector(".actions-container");

	if (document.querySelectorAll(".trigger").length > 1) return;
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

export const moreTogglerMultiple = () => {
	const triggers = document.querySelectorAll(".trigger");
	const actionsContainers = document.querySelectorAll(".actions-container");

	if (triggers.length > 1   && actionsContainers.length > 1  ) {
		triggers.forEach(trigger => {
			trigger.addEventListener("click", e => {
				e.stopPropagation();

				const chosenContainer = Array.from(actionsContainers).find(
					ele => ele.dataset.bookingId === trigger.dataset.bookingId
				);
				const restOfContainer = Array.from(actionsContainers).filter(
					ele => ele.dataset.bookingId !== trigger.dataset.bookingId
				);

				chosenContainer.classList.toggle("none");
				restOfContainer.forEach(ele => ele.classList.add("none"));
			});
		});

		document.body.addEventListener("click", () => {
			actionsContainers.forEach(container => {
				if (!container.classList.contains("none")) {
					container.classList.add("none");
				}
			});
		});
	}
};
