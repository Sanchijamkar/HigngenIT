// auth.js (or wherever your authentication middleware is)

import jwt from 'jsonwebtoken';
import User from '../models/user.js'; // Assuming the user model is needed for validation

export const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the "Authorization" header

  if (!token) {
    return res.status(403).json({ message: 'No token provided, access denied' });
  }

  try {
    // Verify the token and extract user data
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is set in your environment
    const user = await User.findById(decoded.id); // Find the user based on the decoded token's ID

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user; // Attach the user object to the request for use in subsequent routes
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
