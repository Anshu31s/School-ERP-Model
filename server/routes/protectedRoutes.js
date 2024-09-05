import { Router } from 'express';
import authMiddleware from '../middleware/auth.js';
import {logout, getuser, getusers, deleteUser } from '../controllers/auth.js';
import { uploadmarks } from '../controllers/score.js';
import uploadattendance from '../controllers/attendance.js';



const router = Router();

router.get('/getuser', authMiddleware, getuser);
router.delete('/deleteUser', authMiddleware, deleteUser);
router.post('/logout', logout);
router.get('/getusers', getusers);
router.post('/upload-marks', uploadmarks);
router.post('/upload-attendace', uploadattendance);

export default router;