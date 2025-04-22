import express from 'express';
const router = express.Router();
import Question from '../models/question.model.js';

router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
