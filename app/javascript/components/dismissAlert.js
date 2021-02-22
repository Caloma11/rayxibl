const initDismissAlert = () => {
  const alert = document.querySelector(".alert");
  alert.addEventListener('click', (e) => {
    alert.remove();
  })
}

export { initDismissAlert }
