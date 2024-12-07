import express from 'express';
import { login, signup } from '../controllers/authController.js';

const auth_router = express.Router();

auth_router.post('/login', login);
auth_router.post('/signup', signup);

export default auth_router;
