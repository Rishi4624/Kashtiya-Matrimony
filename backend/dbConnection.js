const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = () => {
    try{
    mongoose.connect(process.env.MONGODB_URI).then((response) => {
        if(response)
            console.log("Database connected successfully");
    }).catch((error) => {
        console.log("Database connection failed", error);
    });
}catch(error){
    console.log("Database connection failed", error);
}}


module.exports = connectDB;