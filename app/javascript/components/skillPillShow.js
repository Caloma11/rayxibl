const initSkillPillShow = () => {

  const profilesIndex = document.querySelector(".profiles-index");

  if (profilesIndex) {
    const filter = document.getElementById("filter-content");
    const content = document.querySelector(".content");

    filter.querySelectorAll("input").forEach((el) => {
      el.addEventListener('focus', (event) => {
        content.style.height = "180vh";
      })

      el.addEventListener('focusout', (event) => {
        content.style.height = "120vh";
      })
    })

    const filterCount = Number.parseInt(profilesIndex.dataset.filterCount, 10);
    if (filterCount > 0) {
      const trigger = document.getElementById("filter-trigger");

    const template = `
      <span class="skill-pill filter blue m-0 filter-count">
        ${filterCount.toString().padStart(2, '0')}
      </span>`;

      trigger?.insertAdjacentHTML("beforeend", template);
    }
  }

}

export { initSkillPillShow }
