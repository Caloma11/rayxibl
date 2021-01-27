import flatpickr from "flatpickr";



const initFlatpickr = () => {
  const bookingForm = document.getElementById("new_booking");

  if (bookingForm) {

    // Dates
    flatpickr(".datepicker", {
      disableMobile: true,
      mode: "range",
      dateFormat: "d M",
      locale: {
        rangeSeparator: "  -  "
      }
    });


    const timepickerOptions = { disableMobile: true, noCalendar: true, enableTime: true, time_24hr: true }

    // Times
    const startTimepicker = flatpickr(".start-timepicker", timepickerOptions);

    const endTimepicker = flatpickr(".end-timepicker", timepickerOptions);


  }



}


export { initFlatpickr }
