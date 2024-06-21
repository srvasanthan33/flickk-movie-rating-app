const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    collection: 'user'
})

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)

    next()
})

userSchema.statics.login = async function (username, password) {
    const user = await this.findOne({ username })

    if (user) {

        const auth = await bcrypt.compare(password, user.password)
        console.log(auth)
        if (auth) {
            return user
        } throw Error('incorrect password')
    } throw Error('incorrect username')
}


module.exports = mongoose.model('user', userSchema)