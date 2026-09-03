const User = require("../models/userSchema");
const Admin = require("../models/adminSchema");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        console.log("email:", email, "password:", password);

        if(!email || !password){
            return res.status(400).json({ message: 'Email and password are required', success: false });
        }

        let user = await User.findOne({ email, password }); 
        let isAdmin = false;

        if (!user) {
            user = await Admin.findOne({ email, password });
            if (user) {
                isAdmin = true;
            } else {
                return res.status(201).json({ message: 'Invalid email or password', success: false });
            }
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email,
            role: isAdmin ? 'admin' : 'user'
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "2d"
        }
        );
        const isProduction = process.env.NODE_ENV === 'production';
        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            path: "/",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        if (isAdmin) {
            return res.status(200).json({ 
                message: 'Admin login successful', 
                success: true, 
                user: { _id: user._id, name: user.name, email: user.email, role: 'admin' } 
            });
        }

        const authenticatedUser = await User.findById(user._id)
            .select('-password')
            .populate('likes', '-password')
            .populate('acceptedChats', '-password');
            
        // Append role for frontend
        const userObj = authenticatedUser.toObject();
        userObj.role = 'user';

        return res.status(200).json({ message: 'Login successful', success: true, user: userObj });

    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }

}


module.exports = login;