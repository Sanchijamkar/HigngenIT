import express from 'express';
import { signup, signin } from '../controllers/auth.controller.js';

const router = express.Router();

// Signup Route
router.post('/signup', signup);

// Signin Route
router.post('/signin', signin);

export default router;

