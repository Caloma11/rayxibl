const initSkillPillShow = () => {

  const profilesIndex = document.querySelector(".profiles-index");

  if (profilesIndex) {
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
