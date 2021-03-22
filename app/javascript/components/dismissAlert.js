const initDismissAlert = () => {
	const alert = document.querySelector(".alert");
	alert?.addEventListener("click", e => {
		alert.remove();
	});
  setTimeout(() => {
    alert?.click();
  }, 3000)
};

export { initDismissAlert };
