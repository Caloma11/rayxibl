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
	const bookingTime = document.getElementById("booking_time");
	const timeWrapper = document.querySelector(".bookingSpecific");

	if (bookingEditWrapper) {
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
