import flatpickr from "flatpickr";

const handleChange = (dates, { start, end }) => {
	if (start && end) {
		start.value = new Date(Date.parse(dates[0])).toDateString();
		end.value = new Date(Date.parse(dates[1])).toDateString();
	}
};

export const jobFlatpickr = () => {
	const dateInput = document.getElementById("job-datepicker");
	const startDateInput = document.getElementById("job_start_date");
	const endDateInput = document.getElementById("job_end_date");
	const expirationDateInput = document.getElementById("job_expiration_date");
	const jobPageWrapper =
		document.querySelector(".jobs-new") || document.querySelector(".job-edit");

	if (!jobPageWrapper) return;

	if (dateInput) {
		flatpickr(dateInput, {
			disableMobile: true,
			mode: "range",
			dateFormat: "d-m-Y",
			altFormat: "d M",
			altInput: true,
			locale: {
				rangeSeparator: "  -  "
			},
			onChange: dates => {
				handleChange(dates, {
					start: startDateInput,
					end: endDateInput
				});
			}
		});
	}

	if (expirationDateInput) {
		flatpickr(expirationDateInput, {
			disableMobile: true,
			dateFormat: "d-m-Y"
		});
	}
};
