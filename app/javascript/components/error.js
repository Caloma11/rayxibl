export const error = () => {
	const errorSpans = document.querySelectorAll("span.error");

	errorSpans.forEach(span => {
		const input = span.previousElementSibling;

		if (input) {
			span.classList.add("none");
			input.classList.add("error");
		}
	});
};
