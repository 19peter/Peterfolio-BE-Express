import express from 'express';
const router = express.Router();
import * as cvController from '../controllers/cvController.js';
import auth from '../middleware/auth.js';

router.get('/', cvController.getCvData);
router.put('/', auth, cvController.updateCvData);

export default router;
