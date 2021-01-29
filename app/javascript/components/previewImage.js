const attachPreviewer = (img, input) => {
	input.addEventListener("change", e => {
		const [file] = e.target.files;

		if (file) {
			const reader = new FileReader();
			reader.onload = evt => {
				img.src = evt.currentTarget.result;
			};
			reader.readAsDataURL(file);
			img.classList.remove("initial");
		}
	});
};

const attachImageListener = (img, input) => {
	img.addEventListener("click", () => {
		input.click();
	});
};

export const previewImage = () => {
	const avatarPreviewer = document.getElementById("avatar-preview");
	const logoPreviewer = document.getElementById("logo-preview");
	const userAvatarInput = document.getElementById(
		"manager_user_attributes_avatar"
	);
	const companyLogoInput = document.getElementById(
		"manager_company_attributes_logo"
	);

	if (userAvatarInput && avatarPreviewer) {
		attachPreviewer(avatarPreviewer, userAvatarInput);
		attachImageListener(avatarPreviewer, userAvatarInput);
	}

	if (logoPreviewer && companyLogoInput) {
		attachPreviewer(logoPreviewer, companyLogoInput);
		attachImageListener(logoPreviewer, companyLogoInput);
	}
};
