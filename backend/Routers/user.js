const User = require('../models/userSchema');

const user = async (req, res) => {

    try{
        const id = req.user.id;
        const user = await User.findById(id)
            .select('-password')
            .populate('likes', '-password')
            .populate('acceptedChats', '-password');
        if(!user){
            return res.status(404).json({message: "No User found", success: false});
        }
        console.log(user);
        return res.status(200).json({message: "User Found", success: true, user});
    }catch(error){
            console.log({error});
            return res.status(401).json({message: error, success: false});
    }





}

module.exports = user;