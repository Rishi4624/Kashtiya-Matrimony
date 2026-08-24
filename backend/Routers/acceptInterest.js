const express = require('express');
const User = require('../models/userSchema');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { userId } = req.body;
        const currentUserId = req.user.id;

        if (!userId || String(userId) === String(currentUserId)) {
            return res.status(400).json({ success: false, message: 'Invalid user' });
        }

        const likedByUser = await User.exists({ _id: userId, likes: currentUserId });
        if (!likedByUser) {
            return res.status(403).json({ success: false, message: 'This user has not shown interest in you' });
        }

        await User.updateOne(
            { _id: currentUserId },
            { $addToSet: { likes: userId } }
        );

        return res.status(200).json({ success: true, message: 'Interest accepted' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;