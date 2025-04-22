// models/note.model.js
import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  Course: String,
  Date: String,
  Title: String,
  Language: String,
  Content: String,
  Important: String
});

const Note = mongoose.model('Note', noteSchema);
export default Note;
