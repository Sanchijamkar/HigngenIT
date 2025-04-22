import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  name: String,
  description: String,
  errorCode: String,
  notes: String,
  programmingLanguages: [String],
});

export default mongoose.model('Question', questionSchema);
