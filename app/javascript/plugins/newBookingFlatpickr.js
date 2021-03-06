import flatpickr from "flatpickr";

const initFlatpickr = () => {
	const bookingForm = document.getElementById("new_booking");
	const startDateInput = document.getElementById("booking_start_date");
	const endDateInput = document.getElementById("booking_end_date");

	if (bookingForm) {
		// Dates
		flatpickr("#new-booking-datepickr", {
			disableMobile: true,
			mode: "range",
			dateFormat: "d-m-Y",
			altFormat: "d M",
			altInput: true,
			minDate: new Date(),
			locale: {
				rangeSeparator: "  -  "
			},
			onChange: function (dates) {
				startDateInput.value = new Date(Date.parse(dates[0])).toDateString();
				endDateInput.value = new Date(Date.parse(dates[1])).toDateString();
			}
		});
	}
};

export { initFlatpickr };
