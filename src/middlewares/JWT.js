// middlewares/authenticationMiddleware.js
import { verify } from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Assuming Bearer token
  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to the request object
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid token." });
  }
};

export default authenticate;
