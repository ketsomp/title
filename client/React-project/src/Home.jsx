import React, { useEffect, useState, useCallback } from "react"
import axios from "axios"
import { debounce } from 'lodash'
import './Home.css'

export default function Home(){
    const [recommended, setRecommended] = useState({ movies: [], tvShows: [] })
    const [trending, setTrending] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [query, setQuery] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:3000/api/recommended")
            .then((res) => setRecommended(res.data))
            .catch((err) => console.error(err))

        axios.get("http://localhost:3000/api/trending")
            .then((res) => setTrending(res.data))
            .catch((err) => console.error(err))
    }, [])

    const fetchMovies = async (searchQuery) => {
        if (!searchQuery.trim()) {
            setSearchResults([])
            return;
        }

        setIsLoading(true)
        setError('')

        try {
            const response = await axios.get(`http://localhost:3000/api/search-movie?title=${searchQuery}`)
            setSearchResults(response.data)
        } catch (err) {
            setSearchResults([])
            setError(err.response?.data?.message || 'Error searching movies :(')
        }finally{
            setIsLoading(false)
        }
    }

    const debouncedFetch = useCallback(
        debounce((searchQuery) => fetchMovies(searchQuery), 500),
        []
    )

    const handleSearchInput = (e) => {
        const value = e.target.value;
        setQuery(value);
        debouncedFetch(value);
    };

    const getImageUrl = (movie) => {
        if (movie.images && movie.images.length > 0 && movie.images[0] !== "N/A") {
            return movie.images[0];
        }
        return "https://via.placeholder.com/300x450?text=No+Image+Available"
    }

    return (
        <div className="home-container">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={query}
                    onChange={handleSearchInput}
                    className="search-input"
                />
                {isLoading && <div className="loading-indicator">Searching...</div>}
            </div>

            {error && <div className="error-message">{error}</div>}

            {searchResults.length > 0 && (
                <section className="search-results">
                    <h2>Search Results</h2>
                    <div className="movie-grid">
                        {searchResults.map((movie) => (
                            <div key={movie.imdbID?.[0] || Math.random()} className="movie-card">
                                <div className="movie-poster-container">
                                    <img 
                                        src={getImageUrl(movie)}
                                        alt={`${movie.title} Poster`}
                                        className="movie-poster"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.src = "https://via.placeholder.com/300x450?text=No+Image+Available";
                                        }}
                                    />
                                </div>
                                <div className="movie-info">
                                    <h3>{movie.title}</h3>
                                    <p className="movie-year">{movie.year}</p>
                                    {movie.imdbRating?.[0] && movie.imdbRating[0] !== "N/A" && (
                                        <p className="movie-rating">⭐ {movie.imdbRating[0]}</p>
                                    )}
                                    {movie.director && movie.director !== "N/A" && (
                                        <p className="movie-director">Director: {movie.director}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}


            {error && <div>{error}</div>}

            <section className="recommended">
                <h2>Recommended Movies</h2>
                <div className="card-container">
                    {recommended.movies.map((movie) => (
                        <div key={movie.imdbID} className="card">
                            <h3>{movie.title}</h3>
                        </div>
                    ))}
                </div>

                <h2>Recommended TV Shows</h2>
                <div className="card-container">
                    {recommended.tvShows.map((show) => (
                        <div key={show.imdbID} className="card">
                            <h3>{show.title}</h3>
                        </div>
                    ))}
                </div>
            </section>

            <section className="trending">
                <h2>Trending</h2>
                <div className="card-container">
                    {trending.map((item) => (
                        <div key={item.imdbID} className="card">
                            <h3>{item.title}</h3>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
