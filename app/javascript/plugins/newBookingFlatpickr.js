import flatpickr from "flatpickr";

const initFlatpickr = () => {
	const bookingForm = document.getElementById("new_booking");
	const startDateInput = document.getElementById("booking_start_date");
	const endDateInput = document.getElementById("booking_end_date");
	const bookingTime = document.getElementById("booking_time");
	const timeWrapper = document.querySelector(".bookingSpecific");

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

		// Times
		const timepickerOptions = {
			disableMobile: true,
			noCalendar: true,
			enableTime: true,
			time_24hr: true,
			positionElement: timeWrapper
		};
		let value = "";

		const endTimeFlat = flatpickr(".end-timepicker", {
			...timepickerOptions,
			onClose: (_, time) => {
				value += ` - ${time}`;
				bookingTime.value = value;
			}
		});

		const startTimeFlat = flatpickr(".start-timepicker", {
			...timepickerOptions,
			onClose: () => endTimeFlat.open(),
			onChange: (_, time) => {
				value = time;
			}
		});

		bookingTime.addEventListener("click", e => {
			e.preventDefault();
			if (!startTimeFlat.isOpen && !endTimeFlat.isOpen) {
				startTimeFlat.open();
			} else if (startTimeFlat.isOpen) {
				startTimeFlat.close();
				endTimeFlat.open();
			} else {
				endTimeFlat.close();
				startTimeFlat.open();
			}
		});
	}
};

export { initFlatpickr };
