import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS for styling
import MovieList from './components/MovieList'; // Import MovieList component
import MovieListHeading from './components/MovieListHeading'; // Import MovieListHeading component
import SearchBox from './components/SearchBox'; // Import SearchBox component
import AddFavourites from './components/AddFavourites'; // Import AddFavourites component
import RemoveFavourites from './components/RemoveFavourites'; // Import RemoveFavourites component
import { searchMovies, getTrendingMovies } from './tmdbService'; // Import TMDB service functions

const App = () => {
    // State hooks
    const [movies, setMovies] = useState([]); // Stores the list of movies
    const [favourites, setFavourites] = useState([]); // Stores the list of favorite movies
    const [searchValue, setSearchValue] = useState(''); // Stores the current search input

    // Fetch trending movies on initial load
    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                const response = await getTrendingMovies(); // Call TMDB service to get trending movies
                setMovies(response.data.results); // Update state with the list of movies
            } catch (error) {
                console.error('Error fetching trending movies:', error); // Handle errors
            }
        };

        fetchTrendingMovies(); // Execute the fetch function
    }, []); // Empty dependency array means this runs once when the component mounts

    // Fetch movies based on search value
    useEffect(() => {
        const fetchMovies = async () => {
            if (searchValue.trim() === '') {
                return; // Do nothing if the search value is empty
            }
            try {
                const response = await searchMovies(searchValue); // Call TMDB service to search for movies
                setMovies(response.data.results); // Update state with the search results
            } catch (error) {
                console.error('Error fetching movies:', error); // Handle errors
            }
        };

        fetchMovies(); // Execute the fetch function
    }, [searchValue]); // Runs whenever `searchValue` changes

    // Load favourites from local storage
    useEffect(() => {
        const movieFavourites = JSON.parse(
            localStorage.getItem('react-movie-app-favourites') // Retrieve favourites from local storage
        );

        if (movieFavourites) {
            setFavourites(movieFavourites); // Set state with the retrieved favourites
        }
    }, []); // Empty dependency array means this runs once when the component mounts

    // Save favourites to local storage
    const saveToLocalStorage = (items) => {
        localStorage.setItem('react-movie-app-favourites', JSON.stringify(items)); // Save favourites to local storage
    };

    // Add movie to favourites
    const addFavouriteMovie = (movie) => {
        const newFavouriteList = [...favourites, movie]; // Create a new list with the added movie
        setFavourites(newFavouriteList); // Update state
        saveToLocalStorage(newFavouriteList); // Save to local storage
    };

    // Remove movie from favourites
    const removeFavouriteMovie = (movie) => {
        const newFavouriteList = favourites.filter(
            (favourite) => favourite.id !== movie.id // Create a new list without the removed movie
        );

        setFavourites(newFavouriteList); // Update state
        saveToLocalStorage(newFavouriteList); // Save to local storage
    };

    return (
        <div className='container-fluid movie-app'>
            <div className='row d-flex align-items-center mt-4 mb-4'>
                <MovieListHeading heading='Movies' /> {/* Heading for movie list */}
                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} /> {/* Search box for filtering movies */}
            </div>
            <div className='row'>
                <MovieList
                    movies={movies} // List of movies to display
                    handleFavouritesClick={addFavouriteMovie} // Function to handle adding to favourites
                    favouriteComponent={AddFavourites} // Component for the add-to-favourites button
                />
            </div>
            <div className='row d-flex align-items-center mt-4 mb-4'>
                <MovieListHeading heading='Favourites' /> {/* Heading for favourite movies list */}
            </div>
            <div className='row'>
                <MovieList
                    movies={favourites} // List of favourite movies to display
                    handleFavouritesClick={removeFavouriteMovie} // Function to handle removing from favourites
                    favouriteComponent={RemoveFavourites} // Component for the remove-from-favourites button
                />
            </div>
        </div>
    );
};

export default App;
