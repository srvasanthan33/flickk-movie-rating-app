const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {

    // retrieving the jwt cookie form the browser
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.redirect('/auth/login')
            }
            else {
                //if the token is valid then it is allowed to proceed through the route
                console.log(decodedToken)
                next()
            }
        })
    }
    else {
        console.log('Not authorized to access')
        res.redirect('/auth/login')
    }
}

module.exports = requireAuth