import moment from "moment";

const parseTime = time => parseInt(time.split(":")[0], 10);

/**
 * Price Types:
 * 0 => Per hour (max 8 hour per day)
 * 1 => Per day
 * 2 => Fixed price
 **/

export const generateTotalPrice = options => {
	const dateDiff =
		moment(options.endDate).diff(moment(options.startDate), "days") + 1;

	if (options.billable) {
		if (options.priceType === 2) {
			return options.price;
		} else if (options.priceType === 1) {
			if (options.duration) {
				return dateDiff * options.duration * options.price;
			} else {
				const timeDiff =
					parseTime(options.endTime) - parseTime(options.startTime);

				return dateDiff * timeDiff * options.price;
			}
		} else if (options.priceType === 0) {
			if (options.duration) {
				return dateDiff * options.duration * options.price;
			} else {
				const timeDiff =
					parseTime(options.endTime) - parseTime(options.startTime);

				return dateDiff * timeDiff * options.price;
			}
		}
	}

	// if (options.billable) {
	// 	if (options.price) {
	// 		// THIS IS PER HOUR
	// 		if (options.priceType === 0) {
	// 			const dateDiff =
	// 				moment(options.endDate).diff(moment(options.startDate), "days") + 1;

	// 			// THIS IS VIA SPECIFIC TIME DIFF
	// 			if (options.startTime && options.endTime) {
	// 				const timeDiff =
	// 					parseTime(options.endTime) - parseTime(options.startTime);
	// 				return timeDiff * options.price * dateDiff;
	// 			} else if (options.duration) {
	// 				return options.duration * options.price * dateDiff;
	// 			}
	// 		} else if (options.priceType === 1) {
	// 			// THIS IS PER DAY
	// 		}
	// 	}
	// }
};
