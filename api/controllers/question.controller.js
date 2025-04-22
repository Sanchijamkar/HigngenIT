// api/controllers/question.controller.js

import Question from '../models/question.model.js';

export const getQuestionById = async (req, res) => {
  try {
    console.log("Fetching question by ID:", req.params.id);
    const question = await Question.findById(req.params.id).populate('comments');

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json(question);
  } catch (error) {
    console.error('Error in getQuestionById:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};
