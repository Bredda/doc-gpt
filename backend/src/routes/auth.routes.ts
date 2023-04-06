import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';

const router = Router();

//Login route
router.post('/signin', AuthController.signin);
router.post('/signup', AuthController.signup);
export default router;
