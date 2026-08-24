const express = require('express');
const router = express.Router();

const User = require('../models/userSchema');


router.post('/', async (req, res) =>{

    try{

        const response = await User.updateOne(
            {_id: req.user.id},
            { $set: {avatar: req.image_url}}
        )

        if(response.matchedCount){
            res.status(200).json({success: true, imageUrl: req.image_url, message: "profile Updated successfully"});
        }else{
            res.status(401).json({success: false, message: "profile pic not uploaded"});
        }
        

    }catch(error){
        res.status(500).json({success: false, message: "Server error"});
    }

})
module.exports = router;
