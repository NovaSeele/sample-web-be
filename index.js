import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import route from "./src/routes/exampleRoute.js";
import signinRoute from './src/routes/signinRoute.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse urlencoded request bodies into req.body
app.use(bodyParser.urlencoded({ extended: true }));

// Simple route for the root path
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// Route for example requests
app.use("/example", route);

// Route for sign-in requests
app.use('/auth', signinRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

