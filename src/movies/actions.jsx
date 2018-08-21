export const GET_MOVIES = 'GET_MOVIES';
export const GET_MOVIE = 'GET_MOVIE';
export const RESET_MOVIE = 'RESET_MOVIE';


export function getMovies(id) {
  return async function (dispatch) {
    let url = 'https://api.themoviedb.org/3/discover/movie?api_key=ceb2819405f0bcfd4d6a9135dc4ec3f6&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';
    if (id !== null) {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=ceb2819405f0bcfd4d6a9135dc4ec3f6&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${id}`;
    }
    const res = await fetch(url);
    const movies = await res.json();
    return dispatch({
      type: 'GET_MOVIES',
      data: movies.results,
      total_pages: movies.total_pages,
    });
  };
}

export function getMovie(id) {
  return async function (dispatch) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=ceb2819405f0bcfd4d6a9135dc4ec3f6&language=en-US`,
    );
    const movie = await res.json();
    return dispatch({
      type: 'GET_MOVIE',
      data: movie,
    });
  };
}

export function resetMovie() {
  return {
    type: 'RESET_MOVIE',
  };
}
