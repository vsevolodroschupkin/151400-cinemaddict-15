import ProfileView from '../view/profile.js';
import MainNavView from '../view/main-navigation.js';
import SortingView from '../view/sorting.js';
import ContentView from '../view/content.js';
import MoviesListView from '../view/movies-list.js';
import CardView from '../view/card.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import MovieDetailsView from '../view/movie-details.js';
import NoMoviesView from '../view/no-movies.js';
import { RenderPosition, render, remove } from '../utils/render.js';
import { CARD_COUNT_PER_STEP } from './const.js';

export default class MovieCatalog {
  constructor (movieCatalogContainer){
    this._movieCatalogContainer = movieCatalogContainer;

    this._profileComponent = new ProfileView();
    this._mainNavComponent = new MainNavView();
    this._sortingComponent = new SortingView();
    this. contentComponent = new ContentView();
    this._movieListComponent = new MoviesListView();
    this.cardComponent = new CardView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._movieDetailsComponent = new MovieDetailsView();
    this.noMoviesComponent = new NoMoviesView();
  }

  init(movies) {
    this._movies = movies.slice();

    render(this._movieCatalogContainer, this._mainNavComponent, RenderPosition.BEFOREEND);
    render(this._movieCatalogContainer, this._sortingComponent, RenderPosition.BEFOREEND);
    this._renderMoviesBoard();
  }

  _renderProfile() {

  }

  _renderMainNav() {

  }

  _renderSort() {

  }

  _renderLoadMoreButton() {

  }

  _renderNoMovies() {

  }

  _renderMoviesList() {

  }

  _renderMoviesBoard() {
    const contentTemplate = new ContentView();
    render(boardContainer, contentTemplate, RenderPosition.BEFOREEND);

    const contentContainer = contentTemplate.getContainer();

    if (!this._movies.length) {
      this._renderNoMovies;
      return;
    }

    this._renderMovieslist(contentContainer, this._movies);
  }

}
