export const createProfileTemplate = (profile) => {

  const {profileTitle, avatar} = profile;

  return `<section class="header__profile profile">
    <p class="profile__rating">${profileTitle}</p>
    <img class="profile__avatar" src="${avatar}" alt="Avatar" width="35" height="35">
  </section>`;
};
