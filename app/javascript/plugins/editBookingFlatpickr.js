import flatpickr from "flatpickr";

const handleChange = (dates, { start, end }) => {
	if (start && end) {
		start.value = new Date(Date.parse(dates[0])).toDateString();
		end.value = new Date(Date.parse(dates[1])).toDateString();
	}
};

export const editBookingFlatpickr = () => {
	const bookingEditWrapper = document.querySelector(".booking-edit");
	const dateInput = document.getElementById("edit-booking-datepicker");
	const bookingStartDateInput = document.getElementById("booking_start_date");
	const bookingEndDateInput = document.getElementById("booking_end_date");

	if (bookingEditWrapper) {
		if (dateInput) {
			flatpickr(dateInput, {
				disableMobile: true,
				mode: "range",
				dateFormat: "d-m-Y",
				altFormat: "d M",
				altInput: true,
				minDate: new Date(),
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
	}
};
