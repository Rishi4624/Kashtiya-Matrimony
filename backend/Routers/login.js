const User = require("../models/userSchema");
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
        console.log("Found user:", user);
        if (!user) {
            return res.status(201).json({ message: 'Invalid email or password', success: false });
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        return res.status(200).json({ message: 'Login successful', success: true, user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}


module.exports = login;