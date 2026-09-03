const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const User = require('./models/userSchema');

async function upgrade() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB.");

  // Upgrade the most recently created user
  const user = await User.findOne().sort({ _id: -1 });
  if (user) {
    user.role = 'admin';
    await user.save();
    console.log(`Successfully upgraded ${user.email} to Admin!`);
  } else {
    console.log("No users found.");
  }
  process.exit();
}
upgrade();
