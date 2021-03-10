export const invitationModal = () => {
	const wrapper = document.querySelector(".invitationsWrapper");

	if (wrapper) {
		const overlay = wrapper.querySelector(".invitations-overlay");

		overlay.addEventListener("click", () => {
			window.location = "/profiles";
		});
	}
};
