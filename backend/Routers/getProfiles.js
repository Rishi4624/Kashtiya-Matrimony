const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');

router.get('/', async (req, res) => {

    try{

        
        const id = req.user.id;

        const gender = req.user.gender;
        console.log({requser: req.user});

        const owner = await User.findOne({_id: id});
        
        const users = await User.find({
            _id: {$ne : id},
            gender: {$ne: owner.gender}
        }).select('-password');
        
        
        if(users){
            res.status(200).json({success: true, message: "found all users", users});
        }else{
            res.status(404).json({success: false, message: "No user found", users});
        }
            
    }catch(error){

        res.status(404).json({error});

    }






})

module.exports = router;