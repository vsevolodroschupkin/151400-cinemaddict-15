import ProfileView from './view/profile.js';
import MainNavView from './view/main-navigation.js';
import SortingView from './view/sorting.js';
import ContentView from './view/content.js';
import FilmslistView from './view/filmslist.js';
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
const MOVIE_COUNT = 10;

const movies = generateMoviesArray(MOVIE_COUNT);
const comments = generateCommentsForMovies(movies);

const profile = generateProfile();
const filters = generateFilter(movies);

const cardsCount = Math.min(movies.length, CARD_COUNT_PER_STEP);

const headerElement = document.querySelector('.header');
const footerElement = document.querySelector('.footer');
const mainElement = document.querySelector('.main');

const openPopup = (card, commentsArray) => {
  const popupComponent = new PopupView(card, getMovieComments(card, commentsArray));

  const closePopup = (cb) => {
    popupComponent.getElement().remove();
    document.body.removeEventListener('keydown', cb);
    document.body.classList.remove('hide-overflow');
  };

  const onPopupEscKeydown = (evt) => {
    if(isEscEvent(evt)) {
      evt.preventDefault();
      closePopup(onPopupEscKeydown);
    }
  };
  const onPopupCloseButtonClick = (evt) => {
    evt.preventDefault();
    closePopup(onPopupEscKeydown);
  };

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

  const cardCover = cardComponent.getElement().querySelector('.film-card__poster');
  const cardTitle = cardComponent.getElement().querySelector('.film-card__title');
  const cardComments = cardComponent.getElement().querySelector('.film-card__comments');

  const cardElements = [cardCover, cardTitle, cardComments];
  const addListeners = (element) => element.addEventListener('click', (evt) => {
    evt.preventDefault();
    if(!document.querySelector('.film-details')){
      openPopup(card, comments);
    }
  });

  cardElements
    .forEach((element) => addListeners(element));

  render(cardListElement, cardComponent.getElement(), RenderPosition.BEFOREEND);
};

render(headerElement, new ProfileView(profile), RenderPosition.BEFOREEND);
render(mainElement, new MainNavView(filters), RenderPosition.BEFOREEND);
render(mainElement, new SortingView, RenderPosition.BEFOREEND);
render(mainElement, new ContentView, RenderPosition.BEFOREEND);

const contentContainer = mainElement.querySelector('.films');

if (!movies.length) {
  render(contentContainer, new NoMovieView(), RenderPosition.AFTERBEGIN);
} else {
  const FILM_CONTAINERS_META = [
    {
      title: 'All movies. Upcoming',
      isExtra: false,
      cardsNumber: cardsCount,
    },
    {
      title: 'Top rated',
      isExtra: true,
      cardsNumber: CARD_COUNT_RATED_LIST,
    },
    {
      title: 'Most Commented',
      isExtra: true,
      cardsNumber: CARD_COUNT_COMMENTED_LIST,
    },
  ];

  FILM_CONTAINERS_META.forEach((element) => {
    const filmlistTemplate = new FilmslistView(element.title, element.isExtra);
    render(contentContainer, filmlistTemplate, RenderPosition.BEFOREEND);

    const filmsListContainer = filmlistTemplate.getContainer();

    for (let i = 0; i < element.cardsNumber; i++) {
      renderCard(filmsListContainer, movies[i]);
    }
  });
}

if (movies.length > CARD_COUNT_PER_STEP) {
  let renderedMovieCards = CARD_COUNT_PER_STEP;
  const filmsMainList = mainElement.querySelector('.films-list:nth-child(1)');
  const filmsMainListContainer = mainElement.querySelector('.films-list:nth-child(1) .films-list__container');

  render(filmsMainList, new ShowMoreButtonView, RenderPosition.BEFOREEND);

  const loadMoreButton = filmsMainList.querySelector('.films-list__show-more');
  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    movies
      .slice(renderedMovieCards, renderedMovieCards + CARD_COUNT_PER_STEP)
      .forEach((card) => render(filmsMainListContainer, new CardView(card), RenderPosition.BEFOREEND));

    renderedMovieCards += CARD_COUNT_PER_STEP;

    if ( renderedMovieCards >= movies.length) {
      loadMoreButton.remove();
    }

  });

}

render(footerElement, new FooteStatisticsView(movies.length), RenderPosition.BEFOREEND);

