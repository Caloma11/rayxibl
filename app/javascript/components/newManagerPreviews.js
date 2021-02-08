const newManagerAvatarPreviewImage = () => {
  const banner = document.querySelector(".managerNew .profileBanner");
  const input = document.getElementById('manager_user_attributes_avatar');

  const displayPreview = (input) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        banner.style.backgroundImage = `linear-gradient(0deg, rgba(255, 255, 255, 0.56), rgba(255, 255, 255, 0.56)), url(${event.currentTarget.result})`;
      }
      reader.readAsDataURL(input.files[0])
    }
  }

  if (banner && input) {
    input.addEventListener('change', () => {
      displayPreview(input);
    })
  }
}

const newManagerCompanyLogoPreviewImage = () => {
  const label = document.getElementById("label-logo-placeholder");
  const input = document.getElementById('manager_company_attributes_logo');

  const displayPreview = (input) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        label.innerHTML = `<img src="${event.currentTarget.result}" alt="logo-preview" width=56 height=56 class="rounded-square"> CHANGE`;
        label.classList.add("logo-filled")
      }
      reader.readAsDataURL(input.files[0])
    }
  }

  if (label && input) {
    console.log("IT IS TRUEEEEEE")
    input.addEventListener('change', () => {
      displayPreview(input);
    })
  }
}

const initNewManagerPreviews = () => {
  newManagerAvatarPreviewImage();
  newManagerCompanyLogoPreviewImage();
}

export { initNewManagerPreviews }
