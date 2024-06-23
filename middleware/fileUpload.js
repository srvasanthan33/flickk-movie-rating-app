const multer = require('multer')
const path = require('path')


const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const storePath = './assets/images'
        cb(null, storePath)
    },
    filename: (req, file, cb) => {
        console.log(`upload image - \n ${req.file}`)
        const { movie_id } = req.params
        req.body.att = { movie_id }
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

const uploadImage = multer({ storage: imageStorage })
const uploadVideo = multer({ storage: videoStorage })


module.exports = { uploadImage, uploadVideo }

