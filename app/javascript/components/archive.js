export const archive = () => {
	const toggler = document.getElementById("archive-toggler");
	const togglerImg = toggler.querySelector("img");
	const content = document.getElementById("archived-bookings");

	if (toggler && content) {
		toggler.addEventListener("click", () => {
			togglerImg.classList.toggle("open");
			content.classList.toggle("open");
		});
	}
};
