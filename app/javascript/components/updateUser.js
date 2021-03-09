export const updateUser = () => {
	const userForm = document.getElementById("edit_user");

  const regPage = document.querySelector(".registration-page")


	if (userForm && !regPage) {
		const currencyNode = userForm.querySelector("#user_preferred_currency");
		currencyNode.addEventListener("change", () => userForm.submit());
	}
};
