//need admin privilege
// api/v1/admin/media

const router = require('express').Router()

//multer driver
const { uploadImage, UploadVideo } = require('../middleware/fileUpload')


const { addImage, addVideo } = require('../controllers/adminMediaController')

router.post('/addImage/:movie_id', uploadImage.single("image"), addImage)
router.post('/addVideo/:movie_id', addVideo)


module.exports = router