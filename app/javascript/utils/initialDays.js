import moment from "moment";

const generateInitialDays = () => {
	const initialData = [];
	const startWeek = moment().week();
	const endWeek = moment().add(1, "M").endOf("month").week();

	for (let week = startWeek; week < endWeek - 1; week += 1) {
		const day = Array(7)
			.fill(0)
			.map((n, i) =>
				moment()
					.week(week)
					.startOf("week")
					.clone()
					.add(n + i, "day")
			);
		initialData.push(day);
	}

	return initialData;
};

export const initialDays = generateInitialDays();
