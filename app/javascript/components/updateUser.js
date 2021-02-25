export const updateUser = () => {
	const userForm = document.getElementById("edit_user");

	if (userForm) {
		const currencyNode = userForm.querySelector("#user_preferred_currency");
		currencyNode.addEventListener("change", () => userForm.submit());
	}
};
