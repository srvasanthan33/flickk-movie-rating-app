const router = require('express').Router()

router.get('/', (req, res) => {
    console.log('sudo :)')
    res.status(200).send('welcome you are a admin ')
})




module.exports = router