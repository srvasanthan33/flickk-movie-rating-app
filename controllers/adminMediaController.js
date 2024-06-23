// accessed via admin route

// mediaRoute

const mediaModel = require('../models/media')


const addImage = async (req, res) => {
    console.log(req.file)
    try {
        const movieId = req.params.movie_id

        let movieMedia = await mediaModel.findOne({ movieId })

        if (!movieMedia) {
            movieMedia = new mediaModel({ movieId });
        }

        if (req.file) {
            movieMedia.image = {
                originalname: req.file.originalname,
                size: req.file.size,
                mimetype: req.file.mimetype,
                destination: req.file.destination,
                filename: req.file.filename,
                filePath: req.file.path
            };
        }

        await movieMedia.save()
        res.status(201).json(movieMedia)

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const addVideo = (req, res) => {
    res.send('video upload route')
}


module.exports = { addImage, addVideo }