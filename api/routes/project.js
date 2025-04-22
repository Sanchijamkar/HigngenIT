import express from 'express';
const router = express.Router();
import Project from '../models/Project.js';

router.get('/', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

export default router;
