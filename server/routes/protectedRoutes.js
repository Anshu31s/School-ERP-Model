import { Router } from 'express';
import authMiddleware from '../middleware/auth.js';
import {logout, getuser, deleteUser } from '../controllers/auth.js';
import { getstudents, getNewStudents, getTeachers, updatestudent } from '../controllers/users.js';
import { uploadmarks } from '../controllers/score.js';
import {uploadattendance, getAttendance } from '../controllers/attendance.js';



const router = Router();

router.get('/getuser', authMiddleware, getuser);
router.delete('/deleteUser', authMiddleware, deleteUser);
router.post('/logout', authMiddleware, logout);

router.get('/Get-students', getstudents);
router.get('/Get-teachers', getTeachers);
router.get('/Get-new-students', getNewStudents);

router.post('/upload-marks', uploadmarks);
router.post('/upload-attendace', uploadattendance);
router.get('/get-attendance',authMiddleware, getAttendance);

router.post('/Update-student', updatestudent);

export default router;