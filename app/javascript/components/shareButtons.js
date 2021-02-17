const initShareButtons = () => {

  const links = document.querySelectorAll("share-link");

  links.forEach((link) => {
    const shareData = {
      title: link.dataset.title,
      text: link.dataset.text,
      url: link.dataset.url
    }

    console.log({shareData})

  //   // Must be triggered some kind of "user activation"
  //   link.addEventListener('click', async () => {
  //     try {
  //       await navigator.share(shareData)
  //       console.log("Shared succesfully")
  //     } catch(err) {
  //       console.log("Couldn't share cause of " + err)
  //     }
  //   }
  })

}

export { initShareButtons }
