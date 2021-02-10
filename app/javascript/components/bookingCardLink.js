export const bookingCardLink = () => {
	const bookingCards = document.querySelectorAll(".booking-card");

	if (bookingCards.length > 0) {
		bookingCards.forEach(card => {
			card.addEventListener("click", e => {
				const { id } = e.currentTarget.dataset;

				window.location = `/bookings/${id}`;
			});
		});
	}
};
