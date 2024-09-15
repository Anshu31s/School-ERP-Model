import { Router } from 'express';
import { registerStudent, registerTeacher, login } from '../controllers/auth.js';
import unauthenticated from '../middleware/unauthenticated.js';



const router = Router();
router.post('/register-student', unauthenticated, registerStudent);
router.post('/register-teacher', registerTeacher);
router.post('/login', login); 

export default router;
