const express = require('express')
const router = express.Router()


const { getAllMovies, getMovieById, addRating, editRating } = require('../controllers/rateMovieController')
// router.get('/', (request, response) => {
//     console.log(request.decodedToken.id + 'from movie route')
//     response.send('This is a movie Route from a authorized user')
// })

router.get('/', getAllMovies)
router.get('/:movie_id', getMovieById)
router.post('/addRating/:movie_id', addRating)
router.patch('/editRating/:movie_id', editRating)


module.exports = router