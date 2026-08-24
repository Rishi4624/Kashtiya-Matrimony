const User = require('../models/userSchema');

const updateUser = async (req, res) => {

    try{
    
        const user = await User.findOne({_id:req.user?.id});

        if(!user){

            return res.status(404).json({message: "User Not found cant update", success : false});

        }
        
        await User.updateOne(
            {_id : req.user.id},
            {$set : req.body}
        )

        res.status(200).json({message: "Profile Updates Successfully", success: true});
    }catch(error){
         return res.status(404).json({message: "Server Error", success: false});
    }





}


module.exports = updateUser;