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
    type: Number,
    min: 18,
    max: 100
  },
  city: {
    type: String
  },
  state: {
    type: String
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
  gender: {
    enum: ['male', 'female', 'other'],
    type: String
  },
  religion: {
    type: String,
    enum: ['Hinduism', 'Christianity', 'Islam', 'Buddhism', 'Jainism', 'Sikhism', 'other']
  },
  maritalStatus: {
    type: String,
    enum: ['Never married', 'Divorced', 'Widowed', 'Separated']
  },
  motherTongue: { type: String },
  education: { type: String },
  occupation: { type: String },
  income: { type: String },
  height: { type: String },
  diet: {
    type: String,
    enum: ['Vegetarian', 'Non-vegetarian', 'Eggetarian', 'Vegan', 'Other']
  },
  smoking: {
    type: String,
    enum: ['Never', 'Occasionally', 'Regularly']
  },
  drinking: {
    type: String,
    enum: ['Never', 'Occasionally', 'Regularly']
  },
  familyDetails: { type: String },
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