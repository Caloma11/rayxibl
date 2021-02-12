import flatpickr from "flatpickr";

export const jobFlatpickr = () => {
	const startTimeInput = document.getElementById("job_start_time");
	const endTimeInput = document.getElementById("job_end_time");
	const dateInput = document.querySelector(".datepicker");
	const startDateInput = document.getElementById("job_start_date");
	const endDateInput = document.getElementById("job_end_date");
	const expirationDateInput = document.getElementById("job_expiration_date");
	const timepickerOptions = {
		disableMobile: true,
		noCalendar: true,
		enableTime: true,
		time_24hr: true
	};

	if (startTimeInput) {
		flatpickr(startTimeInput, timepickerOptions);
	}

	if (endTimeInput) {
		flatpickr(endTimeInput, timepickerOptions);
	}

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
				startDateInput.value = new Date(Date.parse(dates[0])).toDateString();
				endDateInput.value = new Date(Date.parse(dates[1])).toDateString();
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
