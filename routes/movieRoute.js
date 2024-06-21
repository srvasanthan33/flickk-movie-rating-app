const express = require('express')
const router = express.Router()

router.get('/', (request, response) => {
    response.send('This is a movie Route from a authorized user')
})


module.exports = router