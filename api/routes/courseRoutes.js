import express from 'express';
import Course from '../models/course.model.js'; // Adjust path as needed

const router = express.Router();

// Route to get courses by category
router.get('/category/:category', async (req, res) => {
  const { category } = req.params; // Get category from the URL

  try {
    const courses = await Course.find({ category: category }); // Query courses by category

    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: `No courses found for category: ${category}` });
    }

    return res.json(courses); // Send courses as a response

  } catch (error) {
    console.error('Error fetching courses:', error);
    return res.status(500).json({ message: 'Error fetching courses' });
  }
});


export default router;
