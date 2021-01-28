const bindBillableCheckbox = () => {
  const priceSection = document.getElementById("priceSection");
  const billableCheckbox = document.getElementById("booking_billable_true");

  if (priceSection) {
    billableCheckbox.addEventListener("change", (event) => {
      priceSection.classList.toggle("none");
    })
  }
}

export { bindBillableCheckbox }
