const express = require('express');

const router = express.Router();

const User = require('../models/userSchema');

router.post('/', async(req, res)=>{

        const {user} = req.body;

    const response = await User.updateOne(
        {_id: user._id || user.id },
        {$addToSet: {likes: req.user.id}}
    )

    return res.status(200).json({
        success: response.matchedCount > 0,
        message: response.matchedCount > 0 ? 'Interest sent' : 'User not found'
    })
})

module.exports = router;