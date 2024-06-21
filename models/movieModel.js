const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    movieName: {
        type: String,
        required: true

    },
    releaseYear: {
        type: String,
        required: true
    },
    genre: {
        type: Array
    }
}, {
    collection: 'movies'
}
)


module.exports = mongoose.model('movies', movieSchema)