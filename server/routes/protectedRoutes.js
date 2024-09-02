import { Router } from 'express';
import authMiddleware from '../middleware/auth.js';
import {logout, getuser, getusers, deleteUser } from '../controllers/auth.js';
import { uploadmarks } from '../controllers/score.js';

const router = Router();

router.get('/getuser', authMiddleware, getuser);
router.delete('/deleteUser', authMiddleware, deleteUser);
router.post('/logout', logout);
router.get('/getusers', getusers);
router.post('/upload-marks', uploadmarks);

export default router;