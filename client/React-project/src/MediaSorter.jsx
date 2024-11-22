import React, { useState } from 'react'
import axios from 'axios'
import './MediaSorter.css'

const MediaSorter = ()=>{
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [lists, setLists] = useState({
        currentlyWatching: [],
        wantToWatch: [],
        finishedWatching: []
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchMovies = async (query) => {
        if (!query.trim()) {
            setSearchResults([])
            return
        }
        setIsLoading(true)
        setError('')

        try {
            const response = await axios.get(`http://localhost:3000/api/search-movie?title=${query}`)
            setSearchResults(response.data)
        } catch (err) {
            setSearchResults([]);
            setError(err.response?.data?.message || 'Error searching movies')
        } finally {
            setIsLoading(false)
        }
    }

    const handleSearchInput = (e) => {
        const value = e.target.value
        setSearchQuery(value)
        fetchMovies(value)
    }

    const addToList = (movie, listName) => {
        const isMovieInList = lists[listName].some(
            item => item.imdbID[0] === movie.imdbID[0]
        )
        if (!isMovieInList) {
            setLists(prevLists => ({
                ...prevLists,
                [listName]: [...prevLists[listName], movie]
            }))
        }
    }

    const removeFromList = (imdbID, listName) => {
        setLists(prevLists => ({
            ...prevLists,
            [listName]: prevLists[listName].filter(
                movie => movie.imdbID[0] !== imdbID
            )
        }))
    }

    const moveMovieBetweenLists = (movie, fromList, toList) => {
        removeFromList(movie.imdbID[0], fromList)
        addToList(movie, toList)
    }

    const renderMovieCard = (movie, listName) => (
        <div key={movie.imdbID[0]} className="movie-card">
            <img 
                src={movie.images[0] !== "N/A" ? movie.images[0] : "https://via.placeholder.com/150x225?text=No+Image+:("}
                alt={movie.title}
                className="movie-poster"
            />
            <div className="movie-details">
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
                {movie.imdbRating?.[0] && (
                    <p>⭐ {movie.imdbRating[0]}</p>
                )}
            </div>
            <div className="movie-actions">
                {listName !== 'currentlyWatching' && (
                    <button 
                        onClick={() => moveMovieBetweenLists(movie, listName, 'currentlyWatching')}
                        className="btn btn-primary"
                    >
                        Currently Watching
                    </button>
                )}
                {listName !== 'wantToWatch' && (
                    <button 
                        onClick={() => moveMovieBetweenLists(movie, listName, 'wantToWatch')}
                        className="btn btn-secondary"
                    >
                        Want to Watch
                    </button>
                )}
                {listName !== 'finishedWatching' && (
                    <button 
                        onClick={() => moveMovieBetweenLists(movie, listName, 'finishedWatching')}
                        className="btn btn-success"
                    >
                        Finished Watching
                    </button>
                )}
                <button 
                    onClick={() => removeFromList(movie.imdbID[0], listName)}
                    className="btn btn-danger"
                >
                    Remove
                </button>
            </div>
        </div>
    );

    return (
        <div className="media-sorter-container">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={handleSearchInput}
                    className="search-input"
                />
                {isLoading && <div className="loading">Searching...</div>}
            </div>

            {searchResults.length > 0 && (
                <div className="search-results">
                    <h2>Search Results</h2>
                    <div className="movie-grid">
                        {searchResults.map(movie => (
                            <div key={movie.imdbID?.[0]} className="search-movie-card">
                                <img 
                                    src={movie.images[0] !== "N/A" ? movie.images[0] : "https://via.placeholder.com/150x225?text=No+Image"}
                                    alt={movie.title}
                                    className="movie-poster"
                                />
                                <div className="movie-details">
                                    <h3>{movie.title}</h3>
                                    <p>{movie.year}</p>
                                </div>
                                <div className="add-to-list-buttons">
                                    <button 
                                        onClick={() => addToList(movie, 'currentlyWatching')}
                                        className="btn btn-primary"
                                    >
                                        Currently Watching
                                    </button>
                                    <button 
                                        onClick={() => addToList(movie, 'wantToWatch')}
                                        className="btn btn-secondary"
                                    >
                                        Want to Watch
                                    </button>
                                    <button 
                                        onClick={() => addToList(movie, 'finishedWatching')}
                                        className="btn btn-success"
                                    >
                                        Finished Watching
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="watchlists">
                <div className="list currently-watching">
                    <h2>Currently Watching</h2>
                    <div className="movie-grid">
                        {lists.currentlyWatching.map(movie => renderMovieCard(movie, 'currentlyWatching'))}
                    </div>
                </div>

                <div className="list want-to-watch">
                    <h2>Want to Watch</h2>
                    <div className="movie-grid">
                        {lists.wantToWatch.map(movie => renderMovieCard(movie, 'wantToWatch'))}
                    </div>
                </div>

                <div className="list finished-watching">
                    <h2>Finished Watching</h2>
                    <div className="movie-grid">
                        {lists.finishedWatching.map(movie => renderMovieCard(movie, 'finishedWatching'))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MediaSorter;