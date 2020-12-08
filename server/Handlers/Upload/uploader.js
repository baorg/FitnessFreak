const cloudinary = require('cloudinary');


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function UploadFileHandler(req, res) {
    const path = Object.values(req.files)[0].path;
    cloudinary.uploader.upload(path)
        .then(image => {
            // console.log('Image: ', image);
            res.json({ url: image.url, success: true })
        })
        .catch(err => {
            console.error(`ERROR: ${err}`);
            res.json({ success: false, url: null })
        });
}

module.exports = {
    UploadFileHandler
};