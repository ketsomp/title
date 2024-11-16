
const express = require('express')
const Model = require('../models/index.js'); 
const router = express.Router()

const axios = require('axios')

const recommendedData = {
    movies: [
        { title: "The Godfather", imdbID: "1" },
        { title: "Pulp Fiction", imdbID: "2" },
        { title: "Inception", imdbID: "3" },
        { title: "The Matrix", imdbID: "4" },
        { title: "Interstellar", imdbID: "5" },
        { title: "Saving Private Ryan", imdbID: "6" },
        { title: "Fight Club", imdbID: "7" }
    ],
    tvShows: [
        { title: "The Sopranos", imdbID: "101" },
        { title: "Breaking Bad", imdbID: "102" },
        { title: "Peaky Blinders", imdbID: "103" },
        { title: "Two and a Half Men", imdbID: "104" },
        { title: "Dexter", imdbID: "105" },
        { title: "Succession", imdbID: "106" }
    ]
};


router.get('/search-movie', async (req, res) => {
    const { title } = req.query

    if (!title){
        return res.status(400).json({ message: 'Title is required' })
    }
    try{
        const apiKey = process.env.OMDB_API_KEY;
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${title}`)
        
        if (response.data.Response === "False") {
            return res.status(404).json({ message: response.data.Error })
        }
        const movies = await Promise.all(response.data.Search.map(async (movie) =>{
            const detailResponse = await axios.get(
                `http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`
            )
            const detailData = detailResponse.data;

            return {
                title: detailData.Title,
                year: detailData.Year,
                runtime: detailData.Runtime,
                genre: detailData.Genre,
                director: detailData.Director,
                writer: detailData.Writer,
                actors: detailData.Actors,
                plot: detailData.Plot,
                images: [detailData.Poster],
                imdbRating: [detailData.imdbRating],
                imdbID: [detailData.imdbID]
            }
        }))
        for (const movie of movies) {
            await Model.findOneAndUpdate(
                { 'imdbID.0': movie.imdbID[0] },
                movie,
                { upsert: true, new: true }
            )
        }

        res.json(movies);
    } catch (err) {
        console.error('Search error:', err);
        res.status(500).json({ message: 'Error searching movies' })
    }
})


router.get('/movie-detail/:id', async (req, res) => {
    try {
        const apiKey = process.env.OMDB_API_KEY
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${req.params.id}`)
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})



// POST new movie
router.post('/movie', async (req, res) =>{
    const data = new Model({
        title: req.body.title,
        year: req.body.year,
        runtime: req.body.runtime,
        genre: req.body.genre,
        director: req.body.director,
        writer: req.body.writer,
        actors: req.body.actors,
        plot: req.body.plot,
        imdbRating: req.body.imdbRating,
        imdbID: req.body.imdbID,
        images: req.body.images
    })
    try {
        const dataToSave = await data.save()
        res.status(201).json(dataToSave)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// GET all movies
router.get("/movie", async (req, res) =>{
    try {
        const data = await Model.find()
        res.json(data)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// GET movie by ID
router.get("/movie/:id", async (req, res) => {
    try {
        const data = await Model.findById(req.params.id)
        if (!data) {
            return res.status(404).json({ message: 'Movie not found' })
        }
        res.json(data)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.put("/movie/:id", async (req, res) => {
    try {
        const result = await Model.findByIdAndUpdate(req.params.id, req.body , { 
            new : true ,
        })
    res.json(result)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.delete("/movie/:id", async (req, res) => {
    try {
        const result = await Model.findByIdAndDelete(req.params.id)
        res.send("Data Succesfully deleted !! ")
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/recommended', (req, res) => {
    const recommendations = {
        movies: [
            { title: "The Godfather", imdbID: "tt0068646" },
            { title: "Pulp Fiction", imdbID: "tt0110912" },
            { title: "Inception", imdbID: "tt1375666" },
            { title: "The Matrix", imdbID: "tt0133093" },
            { title: "Interstellar", imdbID: "tt0816692" },
            { title: "Saving Private Ryan", imdbID: "tt0120815" },
            { title: "Fight Club", imdbID: "tt0137523" }
        ],
        tvShows: [
            { title: "The Sopranos", imdbID: "tt0141842" },
            { title: "Breaking Bad", imdbID: "tt0903747" },
            { title: "Peaky Blinders", imdbID: "tt2442560" },
            { title: "Two and a Half Men", imdbID: "tt0369179" },
            { title: "Dexter", imdbID: "tt0773262" },
            { title: "Succession", imdbID: "tt7660850" }
        ]
    };

    res.json(recommendations);
});

router.get('/trending', async (req, res) => {
    try {
        const trending = [
            { title: "Killers of the Flower Moon", imdbID: "tt5537002" },
            { title: "Oppenheimer", imdbID: "tt15398776" },
            { title: "Barbie", imdbID: "tt1517268" },
            { title: "The Last of Us", imdbID: "tt3581920" },
            { title: "Squid Game", imdbID: "tt10919420" }
        ];
        res.json(trending);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})
module.exports = router
