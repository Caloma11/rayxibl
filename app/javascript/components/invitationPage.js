export const invitationModal = () => {
	const wrapper = document.querySelector(".invitationsWrapper");
	if (wrapper) {
    const closeButton = document.getElementById("closeInvitationsWrapper");
		const overlay = wrapper.querySelector(".invitations-overlay");

		[closeButton,  overlay].forEach((el) => {
      el.addEventListener("click", (event) => {
  			event.preventDefault();
        wrapper.classList.add("none");
  		});
    })
	}
};
