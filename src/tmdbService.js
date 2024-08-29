import axios from 'axios';

const API_KEY = '8bf433e4856105461ea85fcffa5a298e'; // Replace with your TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const searchMovies = (query) => {
  return tmdb.get(`/search/movie`, {
    params: {
      query,
    },
  });
};

export const getTrendingMovies = () => {
  return tmdb.get(`/trending/movie/week`);
};

export const getMovieDetails = (movieId) => {
  return tmdb.get(`/movie/${movieId}`);
};
