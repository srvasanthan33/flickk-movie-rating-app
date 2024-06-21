const router = require('express').Router()

router.get('/', (req, res) => {
    res.status(200).send('welcome you are a admin ')
})

module.exports = router