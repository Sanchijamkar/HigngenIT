// controllers/admin.controller.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';  // Assuming you have an Admin model

// Admin Signup Controller
export const adminSignupController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      email,
      password: hashedPassword,
    });

    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (err) {
    console.error('Error during admin signup:', err);
    res.status(500).json({ message: 'Error signing up admin', error: err.message });
  }
};

// Admin Signin Controller
export const adminSigninController = async (req, res) => {
  const { adminEmail, adminPassword } = req.body;

  try {
    const adminEmail = 'admin@example.com';  // Hardcoded example email
    const adminPassword = 'admin123';  // Hardcoded example password

    if (adminEmail !== adminEmail || adminPassword !== adminPassword) {
      return res.status(403).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: adminEmail }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const adminUser = {
      email: adminEmail,
      isAdmin: true,
    };

    res.status(200).json({ token, user: adminUser });
  } catch (err) {
    console.error('Error signing in admin:', err);
    res.status(500).json({ message: 'Error signing in admin', error: err.message });
  }
};
