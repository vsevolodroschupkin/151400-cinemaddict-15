import Abstract from './abstract.js';

const createProfileTemplate = (rank) => {
  const ranktemplate = rank === '' ? '' : `<p class="profile__rating">${rank}</p>` ;

  return `<section class="header__profile profile">
      ${ranktemplate}
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
};

export default class Profile extends Abstract {
  constructor(profileRating) {
    super();
    this._profileRating = profileRating;
  }

  getTemplate() {
    return createProfileTemplate(this._profileRating);
  }

}

