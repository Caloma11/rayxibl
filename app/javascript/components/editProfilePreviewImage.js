const editPreviewImage = () => {
  const banner = document.querySelector(".profileEdit .profileBanner");
  const input = document.getElementById('profile_profile_user_avatar');

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

export { editPreviewImage }
