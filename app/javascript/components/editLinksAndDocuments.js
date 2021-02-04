const initLinksForm = () => {
  const modalWrapper = document.getElementById("links-modal");
  const addALink = document.getElementById("add-a-link");
  const closeLinksModal = document.getElementById("close-links");


  if (addALink) {
    addALink.addEventListener('click', (e) => {
      modalWrapper.classList.remove("none");
    })

    closeLinksModal.addEventListener('click', (e) => {
      modalWrapper.classList.add("none");
    })
  }
}

const initDocumentsForm = () => {
  const modalWrapper = document.getElementById("documents-modal");
  const uploadADocument = document.getElementById("upload-a-document");
  const closeLinksModal = document.getElementById("close-documents");

  if (uploadADocument) {
    uploadADocument.addEventListener('click', (e) => {
      modalWrapper.classList.remove("none");
    })

    closeLinksModal.addEventListener('click', (e) => {
      modalWrapper.classList.add("none");
    })
  }
}

const initEditLinksAndDocuments = () => {
  initLinksForm();
  initDocumentsForm();
}

export { initEditLinksAndDocuments }
