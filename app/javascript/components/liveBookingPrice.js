import moment from "moment";
import { PRICE_TYPES } from "../utils/constants";
import { generateTotalPrice } from "../utils/generateTotalPrice";

export const liveBookingPrice = () => {
	const container = document.getElementById("new-booking");

	if (!container) return;

	const durationNode = container.querySelector("#booking_duration");
	const startTimeNode = container.querySelector("#booking_start_time");
	const endTimeNode = container.querySelector("#booking_end_time");
	const datesNode = container.querySelector("#new-booking-dates");
	const billableNode = container.querySelector("#booking_billable_true");
	const priceNode = container.querySelector("#booking_price");
	const priceTypeNode = container.querySelector("#booking_price_type");
	const totalPriceNode = container.querySelector("#totalPrice");
	const timeTogglers = container.querySelectorAll(".profileTabs a");
	let specificHour;
	const nodes = [
		durationNode,
		startTimeNode,
		endTimeNode,
		datesNode,
		priceNode,
		priceTypeNode
	];

	timeTogglers.forEach(toggler => {
		toggler.addEventListener("click", e => {
			if (e.currentTarget.id === "duration") {
				specificHour = false;
				startTimeNode.value = "";
				endTimeNode.value = "";
			} else {
				specificHour = true;
				durationNode.value = "";
			}
		});
	});

	const changeCallback = e => {
		let allFilled = datesNode.value !== "";
		const [startDate, endDate] = datesNode.value.split("  -  ");
		const momentStart = moment(startDate, "DD-MM-YYYY");
		const momentEnd = moment(endDate, "DD-MM-YYYY");

		if (specificHour) {
			allFilled = allFilled && startTimeNode.value && endTimeNode.value;
		} else {
			allFilled = allFilled && durationNode.value;
		}

		if (billableNode.value === "true") {
			allFilled = allFilled && priceNode.value && priceTypeNode.value;
		}

		if (!!allFilled) {
			const chosenPriceType = PRICE_TYPES.find(
				ele => ele.text.toLowerCase() === priceTypeNode.value
			).value;
			const options = {
				startDate: momentStart,
				endDate: momentEnd,
				startTime: startTimeNode.value,
				endTime: endTimeNode.value,
				price: parseInt(priceNode.value, 10),
				priceType: chosenPriceType,
				duration: parseInt(durationNode.value, 10),
				billable: billableNode.value === "true"
			};
			const calculatedTotalPrice = generateTotalPrice(options);

			totalPriceNode.innerHTML = `Total: $${calculatedTotalPrice}`;
		}
	};

	const attachChangeListener = node => {
		node.addEventListener("change", changeCallback);
	};
	const removeEventListener = node => {
		node.removeEventListener("change", changeCallback);
	};

	billableNode.addEventListener("change", e => {
		if (e.target.value === "true") {
			nodes.forEach(attachChangeListener);
		} else {
			nodes.forEach(removeEventListener);
		}
	});
};
