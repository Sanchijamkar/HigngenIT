import Course from '../models/course.js';
import User from '../models/User.js';

export const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user._id; // Ensure req.user is set by your auth middleware

    if (!courseId || !userId) {
      return res.status(400).json({ message: 'Course ID and User ID are required' });
    }

    // Ensure the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Ensure the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is already enrolled in this course
    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Enroll the user
    user.enrolledCourses.push(courseId);
    await user.save();

    return res.status(201).json({ message: 'Successfully enrolled in the course' });
  } catch (error) {
    console.error('Enrollment Error:', error);
    return res.status(500).json({ message: 'Server error during enrollment', error: error.message });
  }
};
