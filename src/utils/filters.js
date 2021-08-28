const moviesToFilterMap = [
  [
    'all',
    (movies) => movies.length,
    'All Movies'
  ],
  [
    'watchlist',
    (movies) => movies.filter((movie) => (movie.userDetails.watchlist === true)).length,
    'Watchlist'
  ],
  [
    'history',
    (movies) => movies.filter((movie) => (movie.userDetails.alreadyWatched === true)).length,
    'History'
  ],
  [
    'favorites',
    (movies) => movies.filter((movie) => (movie.userDetails.favorite === true)).length,
    'Favorites'
  ] ,
];

export const generateFilter = (movies) => moviesToFilterMap.map(
  ([filterName, countMovies, filterTitle]) => ({
    name: filterName,
    count: countMovies(movies),
    title: filterTitle,
  }),
);

// export const generateFilter = (movies) => Object.entries(moviesToFilterMap).map(
//   ([filterName, countMovies]) => ({
//     name: filterName,
//     count: countMovies(movies),
//   }),
// );



// TODO: здесь же добавить filterTitle чтобы не вычислять его через switch


