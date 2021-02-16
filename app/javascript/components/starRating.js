import coloredRating from "../packs/images/colored-rating.svg";
import rating from "../packs/images/rating.svg";

const listenerCallback = (i, allButtons) => {
	const buttons = allButtons.slice(0, i);

	allButtons.forEach(ele => {
		ele.innerHTML = `<img src="${rating}" alt="rating" />`;
	});

	buttons.forEach(ele => {
		ele.innerHTML = `<img src="${coloredRating}" alt="star rating" />`;
	});
};

export const starRating = () => {
	const ratingNode = document.getElementById("rating_value");
	const starButtons = document.querySelectorAll(".star-rating");
	const submitButton = document.getElementById("submit");

	starButtons.forEach((btn, i) => {
		btn.addEventListener("click", () => {
			const value = i + 1;
			ratingNode.value = value;
			listenerCallback(value, Array.from(starButtons));

			submitButton.click();
		});
	});
};
