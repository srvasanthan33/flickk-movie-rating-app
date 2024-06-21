const router = require('express').Router()
const { loginGet, signupGet, loginPost, signupPost, logoutGet } = require('../controllers/authenticateController')

router.route('/signup')
    .get(signupGet)
    .post(signupPost)

router.route('/login')
    .get(loginGet)
    .post(loginPost)

router.route('/logout')
    .get(logoutGet)

module.exports = router