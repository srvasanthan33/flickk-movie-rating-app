const jwt = require('jsonwebtoken')
const userModel = require('../models/user')

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
                console.log(`\ndecodedToken ${decodedToken.id} verified`)
                req.decodedToken = decodedToken
                next()

            }
        })
    }
    else {
        console.log('Not authorized to access')
        res.status(403).send('Not authorized to access')
        // res.redirect('/auth/login')
    }
}

// this obtains the cookie authorized cookie token , checks whether the user is valid or not returns locals as nam
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                req.userAccessed = null
                next()
            }
            else {

                let user = await userModel.findById(decodedToken.id)
                if (!user) {
                    return res.status(401).send('Not authorized to accesss')
                }
                // req.userAccessed = user.username
                req.token = decodedToken
                console.log("validUser " + user.username)
                next()
            }
        })
    }
    else {
        req.userAccessed = null
        next()
    }
}

const requireAdmin = (req, res, next) => {
    if (req.decodedToken && req.decodedToken.role == 'admin') {
        next()
    }
    else {
        res.status(403).json({ message: 'Access denied' })
    }
}

module.exports = { requireAuth, requireAdmin, checkUser }