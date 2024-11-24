import express from 'express';
import { signin, signup } from '../controllers/authController.js';

const auth_router = express.Router();

auth_router.post('/signin', signin);
auth_router.post('/signup', signup);

export default auth_router;
