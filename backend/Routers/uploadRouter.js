const cloudinary = require('../config/cloudinary');
const { upload } = require('../middleware/upload');

const uploadImage = (req, res, next) => {
    upload.single('image')(req, res, async (uploadError) => {
        if (uploadError) {
            return next(uploadError);
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'image required' });
        }

        try {
            const result = await cloudinary.uploader.upload(
                `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
                { folder: 'profile-images' }
            );

            req.image_url = result.secure_url;
            return next();
        } catch (error) {
            console.error('Cloudinary upload failed:', error);
            return res.status(500).json({
                success: false,
                message: error.message || 'Image upload failed, try again'
            });
        }
    });
};

module.exports = uploadImage;