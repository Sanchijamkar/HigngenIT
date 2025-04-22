import express from 'express';
import Feedback from '../models/Feedback.js'; // Make sure this file also uses ES module syntax

const router = express.Router();

// Get all feedbacks
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Post new feedback
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  const newFeedback = new Feedback({ name, email, message });

  try {
    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router; // ✅ ES module export
