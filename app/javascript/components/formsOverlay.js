const initFormsOverlay = () => {
  const forms = document.querySelectorAll('form:not([data-remote="true"])');
  const body = document.querySelector('body');
  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      body.insertAdjacentHTML('afterbegin', "<div class='formOverlay'></div>");
      setTimeout(() => {
        document.querySelector('.formOverlay').remove();
      }, 1500)
    })
  })
};

export { initFormsOverlay };
