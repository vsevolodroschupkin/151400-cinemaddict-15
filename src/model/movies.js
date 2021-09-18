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
    console.log('фильм обновился', update);
    this._notify(updateType, update);
  }

  deleteComment(updateType, {commentId, movie}) {
    console.log('movie before comment delete', movie);
    const updatedMovie = {
      ...movie,
      comments: movie.comments.filter((id) => id !== commentId),
    };
    console.log('комменты обновленного фильма из модели:', updatedMovie.comments);
    this.updateMovie(updateType, updatedMovie);

    this._notify(updateType, updatedMovie);
  }

  addComment(updateType, {comment, movie}) {
    console.log('movie before comment added', movie);
    const updatedMovie = {
      ...movie,
      comments: [comment.id, ...movie.comments],
    };
    console.log('комменты обновленного фильма из модели:', updatedMovie.comments);
    this.updateMovie(updateType, updatedMovie);

    this._notify(updateType, updatedMovie);
  }

}
