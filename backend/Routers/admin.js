const express = require('express');
const router = express.Router();
const Admin = require('../models/adminSchema');

// Middleware to check if user is an admin
const checkAdmin = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.user.id);
        if (!admin) {
            return res.status(403).json({ success: false, message: 'Access denied: Admin only' });
        }
        next();
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error verifying admin status' });
    }
};

router.use(checkAdmin);

// 1. Get Dashboard Stats
router.get('/stats', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' });
        const premiumUsers = await User.countDocuments({ role: 'user', isPremium: true });
        const pendingVerifications = await User.countDocuments({ role: 'user', isVerified: false });
        
        const users = await User.find({ role: 'user' });
        const totalRevenue = users.reduce((acc, user) => acc + (user.amountPaid || 0), 0);

        res.json({
            success: true,
            totalUsers,
            premiumUsers,
            freeUsers: totalUsers - premiumUsers,
            pendingVerifications,
            totalRevenue
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// 2. Get All Users (for User Management)
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({ role: 'user' }).select('-password').sort({ _id: -1 });
        res.json({ success: true, users });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// 3. Get Pending Verifications
router.get('/pending', async (req, res) => {
    try {
        const users = await User.find({ role: 'user', isVerified: false }).select('-password').sort({ _id: -1 });
        res.json({ success: true, users });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// 4. Verify User
router.put('/users/:id/verify', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { isVerified: true }, { new: true });
        res.json({ success: true, message: 'User verified successfully', user });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// 5. Delete User
router.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// 6. Toggle Premium (and mock revenue)
router.put('/users/:id/premium', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        
        user.isPremium = !user.isPremium;
        if (user.isPremium) {
            user.premiumDate = new Date();
            user.amountPaid = (user.amountPaid || 0) + 999; // Mocking ₹999 purchase
        }
        await user.save();
        
        res.json({ success: true, message: `Premium status set to ${user.isPremium}`, user });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// 7. Get Premium Users (Transactions/Revenue)
router.get('/premium', async (req, res) => {
    try {
        const users = await User.find({ role: 'user', isPremium: true }).select('-password').sort({ premiumDate: -1 });
        res.json({ success: true, users });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
