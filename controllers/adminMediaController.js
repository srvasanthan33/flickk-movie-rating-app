// accessed via admin route
const addImage = (req, res) => {
    console.log(req.file)
    res.send('image upload route')
}


const addVideo = (req, res) => {
    res.send('video upload route')
}


module.exports = { addImage, addVideo }