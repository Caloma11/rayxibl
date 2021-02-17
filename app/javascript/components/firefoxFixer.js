const initFirefoxFixer = () => {
  const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

  const isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))

  const navbar = document.querySelector(".navbar");

  if (isFirefox && isMobile && navbar) {
    window.addEventListener('scroll', (e) => {
      navbar.style.bottom = 0;
    })
  }

}

export { initFirefoxFixer }


