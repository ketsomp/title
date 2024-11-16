import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MoviesList() {
    const [movies, setMovies] = useState([])
    const [query, setQuery] = useState('')
    const [error, setError] = useState('')

    // Fetch movies based on the search query
    const fetchMovies = async (searchQuery) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/search-movie?title=${searchQuery}`)
            setMovies(response.data)
            setError('')
        }catch(err){
            setMovies([])
            setError('Movies not found')
        }
    }

    const handleSearch = () => {
        if (query.trim()) {
            fetchMovies(query)
        }
    }

    return (
        <div className="movie-list-container">
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search for movies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={handleSearch} style={{ marginLeft: '10px', padding: '5px 10px' }}>
                    Search
                </button>
            </div>

            {error && <div>{error}</div>}

            <div className="movies-container">
                {movies.map((movie) => (
                    <div key={movie.imdbID} className="movie-container">
                        <h2>{movie.Title}</h2>
                        <img src={movie.Poster} alt={movie.Title} className="movie-image" />
                        <p className="movie-content">Year: {movie.Year}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
