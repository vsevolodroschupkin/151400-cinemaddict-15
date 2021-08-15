import ProfileView from './view/profile.js';
import MainNavView from './view/main-navigation.js';
import SortingView from './view/sorting.js';
import ContentView from './view/content.js';
import MainFilmlistView from './view/main-filmlist.js';
import MostCommentedFilmlistView from './view/most-commented-filmlist.js';
import TopRatedFilmlistView from './view/toprated-filmlist.js';
import CardView from './view/card-view.js';
import ShowMoreButtonView from './view/show-more-button.js';
import FooteStatisticsView from './view/footer-statistics.js';
import PopupView from './view/popup.js';
import NoMovieView from './view/no-movie.js';
import { generateMoviesArray, getMovieComments, generateCommentsForMovies } from './mock/movie-mock.js';
import { generateProfile } from './mock/profile-mock.js';
import { generateFilter } from './utils/filters.js';
import { RenderPosition } from './utils/renderPosition.js';
import { render } from './utils/render.js';
import { isEscEvent } from './utils/isEscEvent.js';

const CARD_COUNT_PER_STEP = 5;
const CARD_COUNT_RATED_LIST = 2;
const CARD_COUNT_COMMENTED_LIST = 2;
const MOVIE_COUNT = 20;

const movies = generateMoviesArray(MOVIE_COUNT);
const comments = generateCommentsForMovies(movies);

const profile = generateProfile();
const filters = generateFilter(movies);

const cardsCount = Math.min(movies.length, CARD_COUNT_PER_STEP);

const headerElement = document.querySelector('.header');
const footerElement = document.querySelector('.footer');
const mainElement = document.querySelector('.main');


const onPopupEscKeydown = (evt) => {
  if(isEscEvent(evt)) {
    evt.preventDefault();
    closePopup();
  }
};
const onPopupCloseButtonClick = (evt) => {
  evt.preventDefault();
  closePopup();
};

function closePopup () {
  const popup = document.querySelector('.film-details');
  popup.remove();

  document.body.removeEventListener('keydown', onPopupEscKeydown);
  document.body.classList.remove('hide-overflow');
}

const openPopup = (card, commentsArray) => {
  const popupComponent = new PopupView(card, getMovieComments(card, commentsArray));

  popupComponent
    .getElement()
    .querySelector('.film-details__close-btn')
    .addEventListener('click', onPopupCloseButtonClick);

  document.body.appendChild(popupComponent.getElement());
  document.body.classList.add('hide-overflow');
  document.body.addEventListener('keydown', onPopupEscKeydown);
};

const renderCard = (cardListElement, card) => {
  const cardComponent = new CardView(card);

  cardComponent
    .getElement()
    .querySelector('.film-card__poster')
    .addEventListener('click', (evt) => {
      evt.preventDefault();
      if(!document.querySelector('.film-details')){
        openPopup(card, comments);
        document.addEventListener('keydown', onPopupEscKeydown);
      }
    });


  render(cardListElement, cardComponent.getElement(), RenderPosition.BEFOREEND);
};

render(headerElement, new ProfileView(profile).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new MainNavView(filters).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new SortingView().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new ContentView().getElement(), RenderPosition.BEFOREEND);

const contentContainer = mainElement.querySelector('.films');

if (!movies.length) {
  render(contentContainer, new NoMovieView().getElement(), RenderPosition.AFTERBEGIN);
} else {

  render(contentContainer, new MainFilmlistView().getElement(), RenderPosition.BEFOREEND);
  render(contentContainer, new TopRatedFilmlistView().getElement(), RenderPosition.BEFOREEND);
  render(contentContainer, new MostCommentedFilmlistView().getElement(), RenderPosition.BEFOREEND);

  const filmsMainListContainer = mainElement.querySelector('.films-list:nth-child(1) .films-list__container');
  const topRatedFilmsContainer = mainElement.querySelector('.films-list:nth-child(2) .films-list__container');
  const mostCommentedListContainer = mainElement.querySelector('.films-list:nth-child(3) .films-list__container');


  for (let i = 0; i < cardsCount; i++) {
    renderCard(filmsMainListContainer, movies[i]);
  }
  for (let i = 0; i < CARD_COUNT_RATED_LIST; i++) {
    renderCard(topRatedFilmsContainer, movies[i]);
  }
  for (let i = 0; i < CARD_COUNT_COMMENTED_LIST; i++) {
    renderCard(mostCommentedListContainer, movies[i]);
  }
}

if (movies.length > CARD_COUNT_PER_STEP) {
  let renderedMovieCards = CARD_COUNT_PER_STEP;
  const filmsMainList = mainElement.querySelector('.films-list:nth-child(1)');
  const filmsMainListContainer = mainElement.querySelector('.films-list:nth-child(1) .films-list__container');

  render(filmsMainList, new ShowMoreButtonView().getElement(), RenderPosition.BEFOREEND);

  const loadMoreButton = filmsMainList.querySelector('.films-list__show-more');
  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    movies
      .slice(renderedMovieCards, renderedMovieCards + CARD_COUNT_PER_STEP)
      .forEach((card) => render(filmsMainListContainer, new CardView(card).getElement(), RenderPosition.BEFOREEND));

    renderedMovieCards += CARD_COUNT_PER_STEP;

    if ( renderedMovieCards >= movies.length) {
      loadMoreButton.remove();
    }

  });

}

render(footerElement, new FooteStatisticsView(movies.length).getElement(), RenderPosition.BEFOREEND);

