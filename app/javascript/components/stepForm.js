const previousStepListen = ({
	previousStepButton,
	stepOne,
	stepTwo,
	stepIndicatorOne,
	stepIndicatorTwo
}) => {
	previousStepButton.addEventListener("click", () => {
		stepOne.classList.remove("none");
		stepTwo.classList.add("none");
		stepIndicatorOne.classList.add("active");
		stepIndicatorTwo.classList.remove("active");
	});
};

const nextStepListen = ({
	nextStepButton,
	stepOne,
	stepTwo,
	stepIndicatorOne,
	stepIndicatorTwo
}) => {
	nextStepButton.addEventListener("click", () => {
		stepOne.classList.add("none");
		stepTwo.classList.remove("none");
		stepIndicatorOne.classList.remove("active");
		stepIndicatorTwo.classList.add("active");
    window.scrollTo(0, 0);
	});
};

export const stepForm = () => {
	const container = document.querySelector(".manager-new-page");
  const otherContainer = document.querySelector(".profileEdit")
	const stepOne = document.querySelector(".step-1");
	const stepTwo = document.querySelector(".step-2");
	const previousStepButton = document.querySelector(".previous-step");
	const nextStepButton = document.querySelector(".next-step");
	const stepIndicatorOne = document.querySelector(".step-indicator-1");
	const stepIndicatorTwo = document.querySelector(".step-indicator-2");

	if (container || otherContainer) {
		const elements = {
			stepOne,
			stepTwo,
			nextStepButton,
			previousStepButton,
			stepIndicatorOne,
			stepIndicatorTwo
		};

		nextStepListen(elements);
		previousStepListen(elements);
	}
};
