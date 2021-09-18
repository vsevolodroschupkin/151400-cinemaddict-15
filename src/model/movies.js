import AbstactObserver from '../utils/abstract-observer.js';
export default class Movies extends AbstactObserver {
  constructor() {
    super();
    this._movies = [];
  }

  setMovies(movies) {
    this._movies = movies.slice();
  }

  getMovies() {
    return this._movies;
  }

  updateMovie(updateType, update) {
    const index = this._movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1),
    ];
    this._notify(updateType, update);
  }

  deleteComment(updateType, {commentId, movie}) {
    const updatedMovie = {
      ...movie,
      comments: movie.comments.filter((id) => id !== commentId),
    };
    this.updateMovie(updateType, updatedMovie);

    this._notify(updateType, updatedMovie);
  }

  addComment(updateType, update) {
    const updatedMovie = {
      ...update.movie,
      comments: [update.localComment.id, ...update.movie.comments],
    };
    this.updateMovie(updateType, updatedMovie);

    this._notify(updateType, updatedMovie);
  }

}
