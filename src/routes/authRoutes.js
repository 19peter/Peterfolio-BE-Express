import express from 'express';
const router = express.Router();
import * as authController from '../controllers/authController.js';

// @route   POST api/auth/login
// @desc    Authenticate admin & get token
// @access  Public
router.post('/login', authController.login);

export default router;
