const multer = require('multer');
const storage = multer.memoryStorage();

const cloudinary = require('../config/cloudinary');

const upload = multer({
    storage: storage
});

const uploadImage =  async (req, res, next) => {


    try{
        upload.single("image")

        if(!req.file){
            return res.status(400).json({
                success: false,
                message: "image required"
            });
        }

        const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
            {
                folder:"profile-images"
            }
        ); 
        req.imageUrl = result.secure_url;
        next();
    }catch(error){
        console.error('Cloudinary upload failed:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Image upload failed, try again'
        });
    }
}



module.exports = {upload, uploadImage};