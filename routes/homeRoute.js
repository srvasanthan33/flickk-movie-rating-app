const router = require('express').Router()



const { getThumbnailById, getVideoById, getMovieById, getAllMovies } = require('../controllers/homeController')

router.get('/thumbnail/:id', getThumbnailById)
router.get('/video/:id', getVideoById)
router.get('/:id', getMovieById)
router.get('/', getAllMovies)

module.exports = router