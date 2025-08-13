import express from 'express';
import { userController } from '../controllers/userController.js';

const router = express.Router();

// POST /api/users - Create user profile
router.post('/', userController.createProfile);

// GET /api/users/:userId - Get user profile
router.get('/:userId', userController.getProfile);

// PUT /api/users/:userId - Update user profile
router.put('/:userId', userController.updateProfile);

export default router;