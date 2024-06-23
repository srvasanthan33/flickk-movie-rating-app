const mongoose = require('mongoose')

const attributeSchema = new mongoose.Schema({

    originalname: { type: String, default: '' },
    size: { type: Number, default: 0 },
    mimetype: { type: String, default: '' },
    destination: { type: String, default: '' },
    filename: { type: String, default: '' },
    filePath: { type: String, default: '' }

})


const mediaSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'movie', required: true },
    image: { type: mediaSchema, default: () => ({ filePath: 'assets/images/default_image.jpg' }) },
    video: { type: mediaSchema, default: () => ({ filePath: 'assets/videos/default_image.jpg' }) },
    uploadedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('media', mediaSchema)