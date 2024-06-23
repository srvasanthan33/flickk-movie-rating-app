const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    movie_name: {
        type: String,
        required: true
    },
    release_year: {
        type: Number,
        required: true
    },
    genre: {
        type: [String],
        default: ['Drama']
    },
    synopsis: {
        type: String,
        required: true
    },
    avg_rating: {
        type: Number,
        default: 0
    },
    reviews: {
        type: [
            {
                rating: { type: Number },
                review: { type: String },
                username: { type: String }
            }
        ],
        default: []
    }
},

    {
        collection: 'movie'
    })



module.exports = mongoose.model('movie', movieSchema)