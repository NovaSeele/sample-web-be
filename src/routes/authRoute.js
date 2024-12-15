import express from 'express';
import { login, signup, addPermission, checkPermission } from '../controllers/authController.js';

const auth_router = express.Router();

auth_router.post('/login', login); //route đăng nhập
auth_router.post('/signup', signup); //route đăng ký
auth_router.post('/check-permission', checkPermission); //route kiểm tra quyền/truy cập vào tài liệu dùng quyền
auth_router.post('/add-permission', addPermission); //route thêm/cấp quyền 

export default auth_router;
