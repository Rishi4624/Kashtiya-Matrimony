const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const User = require('./models/userSchema');
const Admin = require('./models/adminSchema');

async function configureAdmin() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB.");

  // Remove admin privileges from all existing users
  await User.updateMany({}, { $unset: { role: 1 } });
  
  // Clear any existing admins from Admin table
  await Admin.deleteMany({});
  
  // Create new admin account in Admin table
  const adminUser = new Admin({
    name: 'System Admin',
    email: 'admin@gmail.com',
    password: 'admin'
  });
  await adminUser.save();
  console.log("Created new admin@gmail.com account in Admin table!");
  
  process.exit();
}
configureAdmin();
