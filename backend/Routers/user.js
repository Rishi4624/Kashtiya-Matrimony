const User = require('../models/userSchema');
const Admin = require('../models/adminSchema');

const user = async (req, res) => {

    try{
        const id = req.user.id;
        
        // First check if it's an admin
        if (req.user.role === 'admin') {
            const admin = await Admin.findById(id).select('-password');
            if (admin) {
                const adminObj = admin.toObject();
                adminObj.role = 'admin';
                return res.status(200).json({ message: "Admin Found", success: true, user: adminObj });
            }
        }

        const user = await User.findById(id)
            .select('-password')
            .populate('likes', '-password')
            .populate('acceptedChats', '-password')
            .populate('shortlisted', '-password');
            
        if(!user){
            return res.status(404).json({message: "No User found", success: false});
        }
        
        const userObj = user.toObject();
        userObj.role = 'user';
        return res.status(200).json({message: "User Found", success: true, user: userObj});
    }catch(error){
            console.log({error});
            return res.status(401).json({message: error, success: false});
    }





}

module.exports = user;