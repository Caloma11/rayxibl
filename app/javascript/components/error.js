export const error = () => {
	const errorSpans = document.querySelectorAll("span.error");

	errorSpans.forEach(span => {
		const input = span.previousElementSibling;

		if (input.type === "hidden" && /_date/g.test(input.id)) {
			const datepicker = document.querySelector(".datepicker.form-control");

			datepicker.classList.add("error");
		}

		if (input) {
			span.classList.add("none");
			input.classList.add("error");
		}
	});
};

export const registerError = () => {
	const emailInput = document.getElementById("resource_email");
	const alertNode = document.querySelector(".alert");

	if (emailInput && alertNode) {
		emailInput.classList.add("error");
	}
};
