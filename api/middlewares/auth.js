// api/middlewares/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Adjust the path if necessary

export const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Replace with your actual secret
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Authentication Error:', err);
    res.status(403).json({ message: 'Invalid Token' });
  }
};
