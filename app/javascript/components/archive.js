export const archive = () => {
	const toggler = document.getElementById("archive-toggler");
	const content = document.getElementById("archived-bookings");

	if (toggler && content) {
		const togglerImg = toggler.querySelector("img");
		toggler.addEventListener("click", () => {
			togglerImg.classList.toggle("open");
			content.classList.toggle("open");
		});
	}
};
