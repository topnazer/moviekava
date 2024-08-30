import axios from 'axios';

// Replace with your TMDB API key
const API_KEY = '8bf433e4856105461ea85fcffa5a298e'; 
const BASE_URL = 'https://api.themoviedb.org/3'; // Base URL for the TMDB API

// Create an axios instance with base URL and API key
const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Function to search for movies based on a query
export const searchMovies = (query) => {
  return tmdb.get(`/search/movie`, {
    params: {
      query,
    },
  });
};

// Function to get trending movies
export const getTrendingMovies = () => {
  return tmdb.get(`/trending/movie/week`);
};

// Function to get details of a specific movie by its ID
export const getMovieDetails = (movieId) => {
  return tmdb.get(`/movie/${movieId}`);
};
