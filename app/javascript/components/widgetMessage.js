const initPrefill = () => {
  const convoShow = document.querySelector(".convo-show");

  if (convoShow) {
    const input = document.getElementById("message_content");
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
