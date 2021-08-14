import { createElement } from '../utils/createElement.js';

const createProfileTemplate = (profile) => {

  const {profileTitle} = profile;

  return `<section class="header__profile profile">
    <p class="profile__rating">${profileTitle}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class Profile {
  constructor(profile) {
    this._profile = profile;
    this._element = null;
  }

  getTemplate() {
    return createProfileTemplate(this._profile);
  }

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
