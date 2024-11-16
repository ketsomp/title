
const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    year: {
        required: true,
        type: String
    },
    runtime: {  
        required: true,
        type: String
    },
    genre: {
        required: true,
        type: String
    },
    director: { 
        required: true,
        type: String
    },
    writer: {
        required: true,
        type: String
    },
    actors: {
        required: true,
        type: String
    },
    plot: {
        type: String
    },
    images: {
        required: true,
        type: Array
    },
    imdbRating: {
        required: true,
        type: Array
    },
    imdbID: {
        required: true,
        type: Array
    }
});

module.exports = mongoose.model('Data', dataSchema)

