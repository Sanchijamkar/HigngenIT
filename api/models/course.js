// api/models/course.js
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  // other fields...
});

export const Course = mongoose.model('Course', courseSchema); // ✅ named export
