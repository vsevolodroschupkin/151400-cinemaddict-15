import he from 'he';
const MAX_DESCRIPTION_LENGTH = 140;

export const getFormattedDescription = (description) => description.length <= MAX_DESCRIPTION_LENGTH ? description : `${description.slice(0, MAX_DESCRIPTION_LENGTH - 1)  }...`;

export const getFormattedDuration = (duration) => {
  const durationHours = Math.floor(duration / 60) !== 0 ? `${Math.floor(duration / 60)}h` : '';
  const durationMinutes = `${duration % 60}m`;

  return `${durationHours} ${durationMinutes}`;
};

export const getMovieComments = (movie, comments) => {
  if (comments) {const commentIds = movie.comments;
    return comments.filter((item) => commentIds.includes(item.id));
  }
};

export const sortMoviesByRatingDesc = (movieA, movieB) => movieB.filmInfo.totalRating - movieA.filmInfo.totalRating;

export const getFormattedComment = (comment) => he.encode(comment);
