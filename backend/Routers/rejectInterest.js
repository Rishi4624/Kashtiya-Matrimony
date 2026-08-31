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

    await Promise.all([
      User.updateOne(
        { _id: currentUserId },
        { $pull: { likes: userId } },
      ),
      User.updateOne(
        { _id: currentUserId },
        { $pull: { acceptedChats: userId } },
      ),
    ]);

    return res.status(200).json({ success: true, message: 'Interest rejected' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
