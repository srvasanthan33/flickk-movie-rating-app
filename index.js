const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()
const path = require('path')

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json())
app.use(cookieParser())
app.use(cors())

const movieRoute = require('./routes/movieRoute')
const authenticateRoute = require('./routes/authenticateRoute')
const { requireAuth, requireAdmin, checkUser } = require('./middleware/authMiddleware')
const adminRoute = require('./routes/adminRoute')
const homeRoute = require('./routes/homeRoute')

const PORT = process.env.PORT

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("connection succesfull")
    })
    .catch((error) => {
        console.log("database connection failed")
    })


app.get('/', (req, res) => {
    res.send('Welcome to flickk , a Movie Rating App')
})




app.use('/api/v1/flickk', homeRoute)

// Protected routes can be accessed only when authorized
app.use('/api/v1/movies', requireAuth, checkUser, movieRoute)
app.use('/api/v1/admin', requireAuth, checkUser, requireAdmin, adminRoute)

console.log(requireAuth)
app.use('/auth', authenticateRoute)

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})