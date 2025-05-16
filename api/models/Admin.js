import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  adminName: {
    type: String,
    required: true,
  },
  adminEmail: {
    type: String,
    required: true,
    unique: true,
  },
  adminPassword: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export default mongoose.model('Admin', adminSchema);
