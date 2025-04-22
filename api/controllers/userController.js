import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Get all users (for admin)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err });
  }
};

// Update user (for admin or self)
export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { username, email, password, profilePicture } = req.body;

  try {
    // Only admin or user themselves can update their profile
    if (req.user.id !== userId && !req.user.isAdmin) {
      return res.status(403).json({ message: 'You can only update your profile or be an admin.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (password) {
      // Hash password before updating
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Update user fields
    user.username = username || user.username;
    user.email = email || user.email;
    user.profilePicture = profilePicture || user.profilePicture;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err });
  }
};

// Delete user (admin only)
export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Only admin can delete users
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'You are not authorized to delete users' });
    }

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err });
  }
};
