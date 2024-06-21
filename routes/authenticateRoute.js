const router = require('express').Router()
const { loginGet, signupGet, loginPost, signupPost } = require('../controllers/authenticateController')

router.route('/signup')
    .get(signupGet)
    .post(signupPost)

router.route('/login')
    .get(loginGet)
    .post(loginPost)

module.exports = router