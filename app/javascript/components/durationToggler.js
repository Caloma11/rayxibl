const clearInputs = (div) => {
  div.querySelectorAll("input").forEach((input) => {
    input.value = "";
  })
}

const bindRelated = (element) => {
  element["tab"].addEventListener('click', (event) => {
    event.preventDefault();
    if (!element["tab"].classList.contains("active")) {
      element["tab"].classList.add("active");
      element["otherTab"].classList.remove("active");
      element["otherTarget"].classList.add("none");
      element["target"].classList.remove("none");
      clearInputs(element["otherTarget"])
    }
  })
}

const initDurationToggler = () => {
  const specificTab = document.getElementById("specific");

  if (specificTab) {

    const durationTab = document.getElementById("duration");
    const specificInputsDiv = document.querySelector(".bookingSpecific");
    const durationInputsDiv = document.querySelector(".bookingDuration");
    const elements = [
      {tab: specificTab, target: specificInputsDiv, otherTarget: durationInputsDiv, otherTab: durationTab},
      {tab: durationTab, target: durationInputsDiv, otherTarget: specificInputsDiv, otherTab: specificTab}
    ]

    elements.forEach(bindRelated)

  }
}

export { initDurationToggler }
