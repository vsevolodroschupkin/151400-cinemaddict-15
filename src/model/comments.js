import { generateComment } from '../mock/comments.js';
import AbstactObserver from '../utils/abstract-observer.js';

export default class Comments extends AbstactObserver {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  getComments() {
    return this._comments;
  }

  addComment(updateType, update) {

    this._comments = [
      update.comment,
      ...this._comments,
    ];

    console.log(this._comments);
    this._notify(updateType, update);
  }

  deleteComment(updateType, update) {
    const index = this._comments.findIndex((comment) => comment.id === update.commentId);

    if(index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1),
    ];


    this._notify(updateType, update);
  }

}
