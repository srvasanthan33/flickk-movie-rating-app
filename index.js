const express = require('express')
const app = express()
require('dotenv').config()

const movieRoute = require('./routes/movieRoute')
const authenticateRoute = require('./routes/authenticateRoute')

const PORT = 5500

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("connection succesfull")
    })
    .catch((error) => {
        console.log("database connection failed")
    })




app.use(express.json())

app.use('/api/v1/movies', movieRoute)
app.use('/auth', authenticateRoute)

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})