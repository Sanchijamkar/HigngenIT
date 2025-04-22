// api/routes/courseRoutes.js
import express from 'express';
import mongoose from 'mongoose';
import { authenticateUser } from '../middlewares/auth.js'; // Corrected import (named export)
import { Course } from '../models/course.js'; // Adjust if you use a named export for Course model
import User from '../models/User.js'; // Adjust if needed

const router = express.Router();

// Enroll route
// api/routes/courseRoutes.js
router.post('/enroll', authenticateUser, async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user?._id;

    if (!courseId || !userId) {
      return res.status(400).json({ message: 'Course ID or User ID missing' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'Already enrolled' });
    }

    user.enrolledCourses.push(courseId);
    await user.save();

    res.status(200).json({ message: 'Enrolled successfully!' });
  } catch (error) {
    console.error('🔥 Enrollment Error:', error);
    res.status(500).json({ message: 'Internal Server Error during enrollment.' });
  }
});
