// routes/adminRoutes.js
import express from 'express';
import { adminSignupController, adminSigninController } from '../controllers/admin.controller.js';
import authenticateAdmin from '../middlewares/adminAuth.js';
import User from '../models/user.js';

const router = express.Router();

// Admin Signup
router.post('/signup', adminSignupController);

// Admin Signin
router.post('/signin', adminSigninController);

// Admin Panel Test Route
router.get('/panel', authenticateAdmin, (req, res) => {
  res.json({
    message: 'Welcome to the Admin Panel',
    admin: req.admin,
  });
});

// Get All Registered Users and Their Enrolled Courses
router.get('/users', authenticateAdmin, async (req, res) => {
  try {
    const users = await User.find({}, 'name email phone gender address qualification course trainingMode enrolledCourses')
      .populate('enrolledCourses', 'title'); // Only get course title
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
});

// DELETE a user by ID
router.delete('/users/:id', authenticateAdmin, async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user', error: err.message });
  }
});

// Update a user by ID
router.put('/users/:id', authenticateAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user', error: err.message });
  }
});

export default router;
