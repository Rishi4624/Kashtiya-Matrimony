const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');

router.post('/', async (req, res) => {
    try {
        const userId = req.user.id;
        const { targetUserId } = req.body;

        if (!targetUserId) {
            return res.status(400).json({ success: false, message: "Target user ID is required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const index = user.shortlisted.indexOf(targetUserId);
        let action = "";

        if (index === -1) {
            user.shortlisted.push(targetUserId);
            action = "added";
        } else {
            user.shortlisted.splice(index, 1);
            action = "removed";
        }

        await user.save();
        return res.status(200).json({ success: true, message: `Profile ${action} to shortlist`, shortlisted: user.shortlisted });
    } catch (error) {
        console.error("Shortlist error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

router.get('/', async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate({
            path: 'shortlisted',
            select: 'name email age city state location avatar gender profession education income height'
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, shortlisted: user.shortlisted });
    } catch (error) {
        console.error("Get shortlist error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
