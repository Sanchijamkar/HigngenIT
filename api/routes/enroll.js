import express from 'express';
import User from '../models/user.js';
import Course from '../models/course.js';
import authenticateUser from '../middlewares/auth.js';

const router = express.Router();

router.post('/enroll', authenticateUser, async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: 'Course ID is required' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const user = await User.findById(req.user.id); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    user.enrolledCourses.push(courseId); // Add course to user’s enrolled courses
    await user.save();

    res.status(200).json({ message: 'Enrolled successfully' });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

export default router;


