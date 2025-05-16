import jwt from 'jsonwebtoken';

const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get token from header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // Attach the decoded admin info to the request

    next();
  } catch (err) {
    console.error('Error verifying admin token:', err);
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

export default authenticateAdmin;
