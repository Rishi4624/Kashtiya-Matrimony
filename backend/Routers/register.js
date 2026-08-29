const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

const register =  async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            gender,
            religion,
            age,
            city,
            state,
            location,
            education,
            occupation,
            maritalStatus
        } = req.body;

        let flag = await User.findOne({ email });
        if (flag) {
            return res.status(201).json({ message: 'User already exists', success: false });
        }

        const user = new User({
            name,
            email,
            password,
            age: age ? Number(age) : undefined,
            city: city || undefined,
            state: state || undefined,
            location: location || [city, state].filter(Boolean).join(', ') || undefined,
            education: education || undefined,
            occupation: occupation || undefined,
            maritalStatus: maritalStatus || undefined,
            gender,
            religion,
            hobbies: req.body.hobbies,
            interests: req.body.interests,
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