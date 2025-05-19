import express from 'express';
import { authenticateUser } from '../middlewares/auth.js';
import Enrollment from '../models/enrollment.model.js';
import Course from '../models/course.model.js';
import User from '../models/user.js';

const router = express.Router();

router.post('/enroll', authenticateUser, async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user._id;

  if (!courseId) {
    return res.status(400).json({ message: 'Course ID is required' });
  }

  try {
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ message: 'User or course not found' });
    }

    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    user.enrolledCourses.push(courseId);
    await user.save();

    course.enrolledUsers.push(userId);
    await course.save();

    res.status(200).json({ message: 'Successfully enrolled in course' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Enrollment failed', error });
  }
});

export default router;
