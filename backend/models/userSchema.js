const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  age: {
    type: Number
  },
  hobbies: {
    type: [String]
  },

  interests: {
    type: [String]
  },
  location:{
    type:String
  }, 
  phone: {
    type: String
  }, 
  bio: {
    type: String
  },
  avatar: {
    type: String
  },
  posts: {
    type: [String]
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  acceptedChats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;