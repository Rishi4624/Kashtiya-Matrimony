const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

const register =  async (req, res) => {
    try {
        const { name, email, password, gender, religion } = req.body;
        // Here you can add logic to save the user data to your database
        let flag = await User.findOne({ email }); // Replace with your actual database query
        if (flag) {
            return res.status(201).json({ message: 'User already exists', success: false });
        }
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            age: req.body.age,
            hobbies: req.body.hobbies,
            interests: req.body.interests,
            gender,
            religion
        });

        const savedUser = await user.save();

        const token = jwt.sign({
            id: savedUser._id,
            email: savedUser.email
        },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/api",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })
        return res.status(201).json({ message: 'User registered successfully', success: true, user: savedUser });

    } catch (error) {

        return res.status(500).json({
            message: error.message,
            success: false
        });

    }

}

module.exports = register;