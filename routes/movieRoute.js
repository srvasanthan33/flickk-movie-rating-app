const express = require('express')
const router = express.Router()

router.get('/', (request, response) => {
    console.log(request.decodedToken.id + 'from movie route')
    response.send('This is a movie Route from a authorized user')
})


module.exports = router