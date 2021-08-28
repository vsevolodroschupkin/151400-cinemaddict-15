import ProfileView from './view/profile.js';
import MainNavView from './view/main-navigation.js';
import SortingView from './view/sorting.js';
import ContentView from './view/content.js';
import MovieslistView from './view/movies-list.js';
import CardView from './view/card.js';
import ShowMoreButtonView from './view/show-more-button.js';
import FooteStatisticsView from './view/footer-statistics.js';
import MovieDetailsView from './view/movie-details.js';
import NoMoviesView from './view/no-movies.js';
import { generateFilter } from './utils/filters.js';
import { RenderPosition, render, remove } from './utils/render.js';
import { isEscEvent } from './utils/common.js';
import { getMovieComments } from './utils/movies.js';
import { generateMovies, generateCommentsForMovies } from './mock/movie.js';
import { getUserRank } from './utils/profile.js';
import { CARD_COUNT_PER_STEP, CONTAINER_TITLES, MOVIE_COUNT } from './const.js';


const generatedMovies = generateMovies(MOVIE_COUNT);
const comments = generateCommentsForMovies(generatedMovies);
const filters = generateFilter(generatedMovies);
const headerElement = document.querySelector('.header');
const footerElement = document.querySelector('.footer');
const mainElement = document.querySelector('.main');

const openPopup = (card, movieComments) => () => {
  const popupComponent = new MovieDetailsView(card, getMovieComments(card, movieComments));

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
  const onPopupCloseButtonClick = () => {
    closePopup(onPopupEscKeydown);
  };

  popupComponent.setCloseClickHandler(onPopupCloseButtonClick);

  document.body.appendChild(popupComponent.getElement());
  document.body.classList.add('hide-overflow');
  document.body.addEventListener('keydown', onPopupEscKeydown);
};

const renderMovieCard = (cardListElement, card) => {
  const cardComponent = new CardView(card);

  cardComponent.setOpenClickHandler(openPopup(card, comments));

  render(cardListElement, cardComponent, RenderPosition.BEFOREEND);
};

const renderMoviesBoard = (boardContainer, movies) => {
  const cardsCount = Math.min(movies.length, CARD_COUNT_PER_STEP);
  const contentTemplate = new ContentView();
  render(boardContainer, contentTemplate, RenderPosition.BEFOREEND);

  const contentContainer = contentTemplate.getContainer();

  if (!movies.length) {
    return render(contentContainer, new NoMoviesView(), RenderPosition.AFTERBEGIN);
  }

  const movieslistTemplate = new MovieslistView(CONTAINER_TITLES.all);
  render(contentContainer, movieslistTemplate, RenderPosition.BEFOREEND);

  const filmsListContainer = movieslistTemplate.getContainer();

  for (let i = 0; i < cardsCount; i++) {
    renderMovieCard(filmsListContainer, movies[i]);
  }

  if (movies.length > CARD_COUNT_PER_STEP) {
    let renderedMovieCards = CARD_COUNT_PER_STEP;

    const showMoreButtonComponent = new ShowMoreButtonView();

    render(filmsListContainer, showMoreButtonComponent, RenderPosition.AFTEREND);

    showMoreButtonComponent.setClickHandler(() => {
      movies
        .slice(renderedMovieCards, renderedMovieCards + CARD_COUNT_PER_STEP)
        .forEach((card) => renderMovieCard(filmsListContainer, card));

      renderedMovieCards += CARD_COUNT_PER_STEP;

      if ( renderedMovieCards >= movies.length) {
        remove(showMoreButtonComponent);
      }

    });
  }

};

render(headerElement, new ProfileView(getUserRank(generatedMovies)), RenderPosition.BEFOREEND);
render(mainElement, new MainNavView(filters), RenderPosition.BEFOREEND);
render(mainElement, new SortingView(), RenderPosition.BEFOREEND);

renderMoviesBoard(mainElement, generatedMovies);

render(footerElement, new FooteStatisticsView(generatedMovies.length), RenderPosition.BEFOREEND);
