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

        const acceptedUser = await User.exists({ _id: userId });
        if (!acceptedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        await Promise.all([
            User.updateOne(
                { _id: currentUserId },
                { $addToSet: { acceptedChats: userId } }
            ),
            User.updateOne(
                { _id: userId },
                { $addToSet: { acceptedChats: currentUserId } }
            )
        ]);

        return res.status(200).json({ success: true, message: 'Interest accepted' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;