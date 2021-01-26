import moment from "moment";

const parseTime = time => parseInt(time.split(":")[0], 10);

export const generateTotalPrice = options => {
	// TODO: UPDATE THIS
	return 100;

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
