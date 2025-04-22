// api/routes/user.route.js
import express from 'express';
import { authenticateUser } from '../middlewares/auth.js';  // ✅ Named import

import {
  getAllUsers,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

const router = express.Router();

// Routes for user management
router.get('/users', authenticateUser, getAllUsers);
router.put('/users/:userId', authenticateUser, updateUser);
router.delete('/users/:userId', authenticateUser, deleteUser);

export default router;
