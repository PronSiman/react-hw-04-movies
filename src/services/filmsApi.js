import axios from 'axios';

const api_key = '8d3bad898f5f4e3fbc1f0aeaae4cc708';
const getTrandingFilms = period => {
  return axios
    .get(
      `https://api.themoviedb.org/3/trending/movie/${period}?api_key=${api_key}`,
    )
    .then(response => response.data.results);
};

const getCurrentMovie = id => {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`,
    )
    .then(response => response.data);
};

const getCurrentMovieCasts = id => {
  return axios
    .get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}`)
    .then(response => response.data.cast);
};
const getCurrenReviews = id => {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${api_key}&language=en-US&page=1`,
    )
    .then(response => response.data.results);
};

const searchMoviesByQuery = query => {
  return axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${query}&page=1&include_adult=false`,
    )
    .then(response => response.data.results);
};

export default {
  getTrandingFilms,
  getCurrentMovie,
  getCurrentMovieCasts,
  getCurrenReviews,
  searchMoviesByQuery,
};
