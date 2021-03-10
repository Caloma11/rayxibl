const initPrefill = () => {
  const convoShow = document.querySelector(".convo-show");

  if (convoShow) {
    const input = document.getElementById("message_content");

      console.log(input.value)

    if (input.value !== "") {
        const text = input.value;
        input.value = "";
        input.focus();
        input.click();
        input.value = text;
        input.scrollLeft = input.scrollWidth;
    }


    document.querySelectorAll(".widget-message").forEach((wm) => {
      wm.addEventListener("click", (e) => {
        e.preventDefault();
        input.value = wm.dataset.message
        input.focus();
        input.click();
      })
    })
  }
}

export { initPrefill }
