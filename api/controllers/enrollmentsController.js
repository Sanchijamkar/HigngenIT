const jwt = require('jsonwebtoken');
const Enrollment = require('../models/Enrollment');  // Assuming Enrollment model is present

app.post('/api/enrollments/enroll', async (req, res) => {
  const { courseId } = req.body; // Extract courseId from request body
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from the Authorization header

  // Validate courseId and token
  if (!courseId) {
    return res.status(400).json({ message: 'Course ID is required' });
  }

  if (!token) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT token
    const userId = decoded.id; // Get user ID from decoded token

    // Logic to enroll the user in the course
    const enrollment = await Enrollment.create({ userId, courseId });

    return res.status(200).json({ message: 'Successfully enrolled in course' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});
