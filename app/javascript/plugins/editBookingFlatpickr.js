import flatpickr from "flatpickr";

const handleChange = (dates, { start, end }) => {
	if (start && end) {
		start.value = new Date(Date.parse(dates[0])).toDateString();
		end.value = new Date(Date.parse(dates[1])).toDateString();
	}
};

export const editBookingFlatpickr = () => {
	const startTimeInput = document.getElementById("booking_start_time");
	const endTimeInput = document.getElementById("booking_end_time");
	const dateInput = document.querySelector(".datepicker");
	const bookingStartDateInput = document.getElementById("booking_start_date");
	const bookingEndDateInput = document.getElementById("booking_end_date");
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
      minDate: new Date,
			locale: {
				rangeSeparator: "  -  "
			},
			onChange: dates => {
				handleChange(dates, {
					start: bookingStartDateInput,
					end: bookingEndDateInput
				});
			}
		});
	}
};
