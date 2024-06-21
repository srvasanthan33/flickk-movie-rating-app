const userModel = require('../models/user')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    })
}

const loginGet = (req, res) => {
    res.send('login here')
}
const signupGet = (req, res) => {
    res.send('signuphere')
}

const signupPost = async (req, res) => {
    const newUser = req.body
    try {
        const existingUser = await userModel.findOne({ username: newUser.username })
        if (existingUser) {
            res.status(401).json({ message: "user Already exists" })
        }

        const user = await userModel.create(newUser)
        console.log(user)

        const token = createToken(user._id)
        res.cookie('jwt', token)

        console.log(`token created ${token}`)
        res.status(201).json(user)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ message: "user not created" })
    }


}

const loginPost = async (req, res) => {
    const { username, password } = req.body


    try {

        const user = await userModel.login(username, password)

        res.status(200).json(user)
    }
    catch (err) {
        res.status(400).json({ message: "username or password does not exist" })
    }
}


module.exports = { loginGet, signupGet, signupPost, loginPost }