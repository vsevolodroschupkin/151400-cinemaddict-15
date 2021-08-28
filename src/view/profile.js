import Abstract from './abstract.js';

// TODO: передавать только profile rating
const createProfileTemplate = (rank) => (

  `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
);

export default class Profile extends Abstract {
  constructor(profileRating) {
    super();
    this._profileRating = profileRating;
  }

  getTemplate() {
    return createProfileTemplate(this._profileRating);
  }

}

// TODO: Удалить, profileTitle вычислять по количеству просмотренных фильмов, см. ТЗ.

