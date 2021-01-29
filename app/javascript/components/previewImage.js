export const previewImage = () => {
	const previewer = document.getElementById("photo-preview");
	const userAvatarInput = document.getElementById(
		"manager_user_attributes_avatar"
	);

	if (previewer && userAvatarInput) {
		userAvatarInput.addEventListener("change", e => {
			const [file] = e.target.files;

			if (file) {
				const reader = new FileReader();
				reader.onload = evt => {
					previewer.src = evt.currentTarget.result;
				};
				reader.readAsDataURL(file);
				previewer.classList.remove("initial");
			}
		});
	}
};
