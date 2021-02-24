const initUploadCSV = () => {
  const input = document.getElementById("bulk_invitation_csv_file");
  const folderImage = document.querySelector(".upload-csv img");
  const inviteText = document.querySelector(".invite-multiple");
  const previewSpan = document.getElementById("csv_text_preview");
  const buttons = document.querySelector(".buttons");
  const inviteInput = document.getElementById("invitation_email");


  const truncated = (text) => {
    if (text.length < 20) {
      return text
    } else {
      return text.substring(0, 20) + "..." + text.substring(text.length - 4, text.length)
    }
  }

  const displayPreview = (input) => {
    console.log(input)
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        folderImage.classList.add('none');
        inviteText.classList.add("none");
        previewSpan.innerText = truncated(input.files[0].name);
        buttons.classList.remove("none");
        inviteInput.disabled = true;
      }
      reader.readAsDataURL(input.files[0])
    }
  }

  if (folderImage && input) {
    input.addEventListener('change', () => {
      displayPreview(input);
    })

    previewSpan.addEventListener('click', (e) => {
      input.click();
    })
  }
}


export { initUploadCSV }
