//import User from '../models/user.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

// @desc    Register a new user
export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next(errorHandler(400, 'All fields are required'));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(409, 'Email is already registered'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      userId: newUser._id,
    });
  } catch (err) {
    console.error('Signup error:', err);
    next(errorHandler(500, 'Error registering user'));
  }
};

// @desc    Login user and return JWT
export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(errorHandler(400, 'Email and password are required'));
    }

    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found'));

    const isMatch = bcryptjs.compareSync(password, validUser.password);
    if (!isMatch) return next(errorHandler(401, 'Invalid password'));

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const { password: _, ...userData } = validUser._doc;

    res
      .cookie('access_token', token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        ...userData,
        token,
        role: validUser.isAdmin ? 'admin' : 'user',
        message: 'Login successful',
      });
  } catch (error) {
    console.error('Signin error:', error);
    next(errorHandler(500, 'Internal server error'));
  }
};

// @desc    Logout the user
export const signout = (req, res) => {
  res.clearCookie('access_token', {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    secure: process.env.NODE_ENV === 'production',
  });
  res.status(200).json({ message: 'Signout successful' });
};

// @desc    Google Signin - To be implemented
export const google = async (req, res, next) => {
  try {
    // You can integrate Google OAuth here
    return res.status(501).json({ message: 'Google login not implemented yet' });
  } catch (error) {
    console.error('Google sign-in error:', error);
    next(errorHandler(500, 'Google login failed'));
  }
};
