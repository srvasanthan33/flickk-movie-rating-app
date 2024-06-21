const router = require('express').Router()

const { addMovie, updateMovie, deleteMovie } = require('../controllers/adminMovieController')

router.get('/', (req, res) => {
    console.log('sudo :)')
    res.status(200).send('welcome you are a admin ')
})

router.post('/addMovie', addMovie)
router.patch('/updateMovie/:movie_id', updateMovie)
router.delete('/deleteMovie/:movie_id', deleteMovie)




module.exports = router