import express from 'express';
import { authenticateUser } from '../middlewares/auth.js';  // Named import
import Enrollment from '../models/enrollment.model.js';  // Import the Enrollment model
import Course from '../models/course.model.js';  // Import the Course model
import User from '../models/user.js';  // Import the User model (assuming it's required)

const router = express.Router();

router.post('/enroll', authenticateUser, async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user._id; // User is set by the authenticateUser middleware

  if (!courseId) {
    return res.status(400).json({ message: 'Course ID is required' });
  }

  try {
    // Find the user and course
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ message: 'User or course not found' });
    }

    // Check if already enrolled
    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Add course to user
    user.enrolledCourses.push(courseId);
    await user.save();

    // Optionally, update course with the enrolled user
    course.enrolledUsers.push(userId);
    await course.save();

    res.status(200).json({ message: 'Successfully enrolled in course' });
  } catch (error) {
    res.status(500).json({ message: 'Error enrolling in course', error });
  }
});

export default router;
