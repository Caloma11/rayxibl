import Rails from "@rails/ujs";

export const fetchMoreMessages = () => {
	const form = document.getElementById("fetch-more-messages");

	if (form) {
		window.addEventListener("scroll", () => {
			if (window.scrollY === 0) {
				Rails.fire(form, "submit");
			}
		});
	}
};
