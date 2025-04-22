import express from 'express';
import Question from '../models/question.model.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
