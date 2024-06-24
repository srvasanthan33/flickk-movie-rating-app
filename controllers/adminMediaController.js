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


const addVideo = async (req, res) => {
    try {
        const movieId = req.params.movie_id;

        // Find or create a new mediaModel document based on movieId
        let movieMedia = await mediaModel.findOne({ movieId });

        if (!movieMedia) {
            movieMedia = new mediaModel({ movieId });
        }

        // Check if req.file exists and update video information
        if (req.file) {
            movieMedia.video = {
                originalname: req.file.originalname,
                size: req.file.size,
                mimetype: req.file.mimetype,
                destination: req.file.destination,
                filename: req.file.filename,
                filePath: req.file.path
            };
        } else {
            return res.status(400).json({ message: 'No video file uploaded' });
        }

        // Save the updated or new mediaModel document
        await movieMedia.save();
        res.status(201).json(movieMedia);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};



module.exports = { addImage, addVideo }