

const userModel = require('../models/user')

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
            res.status(401).json({ errorMessage: "user Already exists" })
        }

        const user = await userModel.create(newUser)
        console.log(user)
        res.status(201).json(user)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ message: "user not created" })
    }


}

const loginPost = (req, res) => {
    res.send("Logged in")
}


module.exports = { loginGet, signupGet, signupPost, loginPost }