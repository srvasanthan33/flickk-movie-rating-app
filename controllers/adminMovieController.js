
const movieModel = require('../models/movie')

const addMovie = async (req, res) => {
    console.log(req.body)
    try {
        const { movie_name, release_year, genre, synopsis } = req.body

        const lastMovie = await movieModel.findOne().sort('-movie_id');
        const movie_id = lastMovie ? lastMovie.movie_id + 1 : 1;

        const newMovie = new movieModel({
            movie_id,
            movie_name,
            release_year,
            genre,
            synopsis
        })

        const existingMovie = await movieModel.findOne({ movie_name })
        if (existingMovie) {
            return res.status(400).json({ message: 'movie already exist' })
        }

        const movie = await movieModel.create(newMovie)
        console.log(movie + ' added successfully')
        res.status(201).json(movie)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

const updateMovie = async (req, res) => {
    const { movie_id } = req.params
    const updatedMovieDetails = req.body

    try {
        const movie = await movieModel.findOneAndUpdate({ movie_id }, { $set: updatedMovieDetails }, { new: true })
        console.log(movie)
        res.status(201).json(movie)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deleteMovie = async (req, res) => {
    try {
        const { movie_id } = req.params

        const deleteAcknowledged = await movieModel.deleteOne({ movie_id })
        console.log(deleteAcknowledged + ' deleted successfully ')
        res.status(201).json(deleteAcknowledged)
    }
    catch (err) {
        console.log({ message: err.message })
    }
}

module.exports = { addMovie, updateMovie, deleteMovie }