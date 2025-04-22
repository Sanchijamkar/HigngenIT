// utils/verifyUser.js

export const verifyAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      return next();  // Proceed to the next middleware or route handler
    } else {
      return res.status(403).json({ message: "You do not have permission to access this route." });
    }
  };
  