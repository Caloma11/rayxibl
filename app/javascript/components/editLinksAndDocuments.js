const initLinksForm = () => {
	const modalWrapper = document.getElementById("links-modal");
	const addALink = document.getElementById("add-a-link");
	const closeLinksModal = document.getElementById("close-links");

	if (addALink) {
		addALink.addEventListener("click", e => {
			modalWrapper.classList.remove("none");
		});

		closeLinksModal.addEventListener("click", e => {
			modalWrapper.classList.add("none");
		});
	}
};

const initDocumentsForm = () => {
	const modalWrapper = document.getElementById("documents-modal");
	const uploadADocument = document.getElementById("upload-a-document");
	const closeLinksModal = document.getElementById("close-documents");

	if (uploadADocument) {
		uploadADocument.addEventListener("click", e => {
			modalWrapper.classList.remove("none");
		});

		closeLinksModal.addEventListener("click", e => {
			modalWrapper.classList.add("none");
		});
	}
};

const initEditLinksModals = (ajax = false) => {
  // const editModals = document.querySelectorAll(".edit-link-modal-bound");
  let editLinks;
  if (ajax) {
    editLinks = document.querySelectorAll(".edit-link");
  } else {
    editLinks = document.querySelectorAll(".edit-link-bound");
  }

  if (editLinks) {
    editLinks.forEach((link) => {
      const linkId = link.dataset.linkId;
      const modal = document.getElementById(`edit-links-modal-${linkId}`);

      link.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.remove("none");
      })

      const closeModal = document.getElementById(`edit-close-links-${linkId}`);
      closeModal.addEventListener('click', (e) => {
        modal.classList.add("none");
      })


    })
  }

}

const initEditLinksAndDocuments = () => {
	initLinksForm();
	initDocumentsForm();
  initEditLinksModals();
  window.initEditLinksModals = initEditLinksModals;
};




export { initEditLinksAndDocuments };
