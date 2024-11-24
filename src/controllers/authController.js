import { authenticateUser } from '../services/authService.js';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

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

export const signup = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ success: false, message: "Username, password, and email are required." });
  }

  try {
    // Create a new user instance
    const newUser = new User({ username, password, email });

    // Save the user to the database
    await newUser.save();

    res.json({ success: true, message: "Signup successful." });
  } catch (error) {
    // Handle errors, such as duplicate username or validation errors
    res.status(500).json({ success: false, message: error.message });
  }
};