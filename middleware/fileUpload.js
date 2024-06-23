const multer = require('multer')
const path = require('fs')


const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const storePath = '../assets/images'
        cb(null, storePath)
    },
    filename: (req, file, cb) => {
        console.log(`upload image - \n ${req.file}`)
        const { movie_id } = req.params
        cb(null, movie_id + path.extname(file.originalname))
    }
})

const videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const storePath = '../assets/videos'
        cb(null, storePath)
    },
    filename: (req, file, cb) => {
        console.log(`upload video - \n ${req.file}`)
        const { movie_id } = req.params
        cb(null, movie_id + path.extname(file.originalname))
    }
})

const imageUpload = multer({ storage: imageStorage })
const videoUpload = multer({ storage: videoStorage })


module.exports = { imageUpload, videoUpload }

