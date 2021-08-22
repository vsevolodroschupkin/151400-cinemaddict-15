export const getFormattedDuration = (duration) => {
  const durationHours = Math.floor(duration / 60) !== 0 ? `${Math.floor(duration / 60)}h` : '';
  const durationMinutes = `${duration % 60}m`;

  return `${durationHours} ${durationMinutes}`;
};

// TODO: movies.js
