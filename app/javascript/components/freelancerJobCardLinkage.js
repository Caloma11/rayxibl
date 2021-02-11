export const freelancerJobCardLink = () => {
	const freeJobCards = document.querySelectorAll(".freelancer-job-card");

	if (freeJobCards.length > 0) {
		freeJobCards.forEach(card => {
			card.addEventListener("click", e => {
				window.location = e.currentTarget.dataset.path;
			});
		});
	}
};
