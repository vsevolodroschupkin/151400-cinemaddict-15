import Abstract from './abstract.js';

const createProfileTemplate = (profile) => {

  const {profileTitle} = profile;

  return `<section class="header__profile profile">
    <p class="profile__rating">${profileTitle}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class Profile extends Abstract {
  constructor(profile) {
    super();
    this._profile = profile;
  }

  getTemplate() {
    return createProfileTemplate(this._profile);
  }

}
