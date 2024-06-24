const mediaModel = require('../models/media')
const movieModel = require('../models/movie')
const path = require('path');
const fs = require('fs');


const getThumbnailById = async (req, res) => {

    try {
        const movieId = req.params.id;
        const movieMedia = await mediaModel.findOne({ movieId }).lean()

        if (!movieMedia || !movieMedia.image || !movieMedia.image.filePath) {
            return res.status(404).json({ message: 'Image not found for this movie' });
        }

        const imagePath = path.resolve(movieMedia.image.filePath);
        if (fs.existsSync(imagePath)) {
            res.sendFile(imagePath);
        } else {
            res.status(404).json({ message: 'Image file not found on server' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getVideoById = async (req, res) => {
    try {
        const movieId = req.params.id;
        const movieMedia = await mediaModel.findOne({ movieId }).lean()

        if (!movieMedia || !movieMedia.video || !movieMedia.video.filePath) {
            return res.status(404).json({ message: 'Video not found for this movie' });
        }

        const videoPath = path.resolve(movieMedia.video.filePath);
        if (fs.existsSync(videoPath)) {
            res.sendFile(videoPath);
        } else {
            res.status(404).json({ message: 'Image file not found on server' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllMovies = async (req, res) => {
    const baseUrl = 'http://localhost:5500/api/v1/flickk'
    try {
        const { movie_name, release_year, genre, synopsis, avg_rating, reviews, ...movie_id } = await movieModel.find()
        const movieDetails = await movieModel.find()
        const mediaDetails = await mediaModel.find()

        let respond_data = []
        movieDetails.forEach(ele => {
            mediaDetails.forEach(media => {
                if (mediaDetails.movieId == movieDetails._id) {
                    respond_data.push(
                        ele._id = { ele, media })
                }
            })
        })





        res.status(201).json(respond_data)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getMovieById = async (req, res) => {
    res.send('movie by id')
}


module.exports = { getThumbnailById, getVideoById, getMovieById, getAllMovies }