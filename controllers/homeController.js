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
            res.status(404).json({ message: 'Video file not found on server' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const getAllMovies = async (req, res) => {
    try {
        const movies = await movieModel.find();
        const media = await mediaModel.find();

        const baseUrl = `${req.protocol}://${req.get('host')}`;

        const respond_data = movies.map(movie => {
            const movieMedia = media.find(m => m.movieId.toString() === movie._id.toString());
            const imageUrl = movieMedia && movieMedia.image ? `${baseUrl}/${movieMedia.image.filePath.replace(/\\/g, '/')}` : null;
            const videoUrl = movieMedia && movieMedia.video ? `${baseUrl}/${movieMedia.video.filePath.replace(/\\/g, '/')}` : null;

            return {
                movieData: {
                    movie_id: movie._id,
                    movie_name: movie.movie_name,
                    release_year: movie.release_year,
                    genre: movie.genre,
                    synopsis: movie.synopsis,
                    avg_rating: movie.avg_rating,
                    reviews: movie.reviews

                },
                media: {
                    imageUrl,
                    videoUrl
                }
            };
        });

        res.status(201).json(respond_data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getMovieById = async (req, res) => {
    try {
        const movieId = req.params.id

        const movie = await movieModel.findOne({ _id: movieId });
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        const media = await mediaModel.findOne({ movieId });

        if (!media) {
            return res.status(404).json({ message: 'Media not found for this movie' });
        }

        const baseUrl = `${req.protocol}://${req.get('host')}`;

        const movieMedia = media
        const imageUrl = movieMedia && movieMedia.image ? `${baseUrl}/${movieMedia.image.filePath.replace(/\\/g, '/')}` : null;
        const videoUrl = movieMedia && movieMedia.video ? `${baseUrl}/${movieMedia.video.filePath.replace(/\\/g, '/')}` : null;

        const respond_data = {
            movieData: {
                movie_id: movie._id,
                movie_name: movie.movie_name,
                release_year: movie.release_year,
                genre: movie.genre,
                synopsis: movie.synopsis,
                avg_rating: movie.avg_rating,
                reviews: movie.reviews

            },
            media: {
                imageUrl,
                videoUrl
            }
        };
        res.status(201).json(respond_data);
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}



module.exports = { getThumbnailById, getVideoById, getMovieById, getAllMovies }