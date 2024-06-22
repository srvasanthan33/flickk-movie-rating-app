const movieModel = require('../models/movie')
const userModel = require('../models/user')

const getAllMovies = async (req, res) => {
    try {

        const moviesList = await movieModel.find()

        res.status(200).json(moviesList)
    }
    catch (err) {
        res.status(401).json({ message: err.message })
    }
}

const getMovieById = async (req, res) => {
    try {
        const { movie_id } = req.params
        const movie = await movieModel.findOne({ movie_id })
        console.log(`movie id ${movie.movie_id} retrieved`)
        res.status(200).json(movie)
    }
    catch (err) {
        res.status(401).json({ message: err.message })
    }
}

const addRating = async (req, res) => {
    try {
        console.log(req.decodedToken.id)
        u_id = req.decodedToken.id


        const user = await userModel.findById(u_id)
        const username = user.username
        console.log(`Welcome ${user.username}`)


        //add rating functionality
        let { rating, review } = req.body
        rating = parseInt(rating, 10)

        if ((isNaN(rating)) || (rating < 0) && (rating > 10)) {
            throw Error({ message: 'provide rating between 1 and 10' })
        }

        const movie_id = req.params.movie_id

        const movie = await movieModel.findOne({ movie_id })
        if (!movie) {
            res.status(404).json({ message: 'Movie not found' })
        }

        //Checking whether the user has posted a review
        const mvi = movie.reviews.findIndex(ele => ele.username === username)
        if (mvi >= 0) {
            console.log(mvi)
            movie.reviews[mvi].rating = rating
            movie.reviews[mvi].review = review
        }
        else {
            movie.reviews.push({ rating, review, username })
        }

        let sumOfRating = movie.reviews.reduce((acc, review) => acc + review.rating, 0)
        let avg_rating = sumOfRating / movie.reviews.length

        movie.avg_rating = avg_rating
        const saveack = await movie.save()
        console.log(saveack)
        res.status(201).json({ message: `Review added successfully`, movie })

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }


}

const editRating = () => { }

module.exports = { getAllMovies, getMovieById, addRating, editRating }