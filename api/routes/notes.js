// routes/notes.js
import express from 'express';
import Note from '../models/note.model.js';  // Correct model path

const router = express.Router();

router.post('/createNote', async (req, res) => {
  try {
    const newNote = new Note(req.body);
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    console.error('Failed to create note:', err);
    res.status(500).json({ message: 'Failed to create note' });
  }
});

export default router;

