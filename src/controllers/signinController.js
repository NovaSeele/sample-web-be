import { authenticateUser } from '../services/signinService.js';
import jwt from 'jsonwebtoken';

export const signin = (req, res) => {
  const { username, password } = req.body;

  const result = authenticateUser(username, password);

  if (!result.success) {
    return res.status(401).json(result);
  }

  // Generate JWT token
  const token = jwt.sign({ id: result.user.id, username: result.user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ success: true, message: result.message, token });
};
