const initContinueReading = () => {

  const widgets = document.querySelectorAll(".booking-widget");

  if (widgets.length > 0) {
    widgets.forEach((widget) => {
      const truncatedDescription = widget.querySelector(".truncated-description");
      const continueReadingSpan = widget.querySelector(".continue-reading");
      const fullDescription = widget.querySelector(".full-description");
      continueReadingSpan?.addEventListener("click", (e) => {
        truncatedDescription.classList.add("none");
        continueReadingSpan.classList.add("none");
        fullDescription.classList.remove("none");
      })
    })
  }
}


export { initContinueReading }
