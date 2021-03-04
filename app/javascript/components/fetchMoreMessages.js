import Rails from "@rails/ujs";

export const fetchMoreMessages = () => {
	const form = document.getElementById("fetch-more-messages");

	if (form) {
		const fetchingIndicator = document.getElementById("fetching-indicator");
		window.addEventListener("scroll", () => {
			if (window.scrollY === 0) {
				fetchingIndicator.classList.remove("none");
				Rails.fire(form, "submit");
			}
		});
	}
};
