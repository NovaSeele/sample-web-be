import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import auth_router from "./src/routes/authRoute.js";
import project_router from "./src/routes/projectRoute.js";
import ticket_router from "./src/routes/ticketRoute.js";
import sprint_router from "./src/routes/sprintRoute.js";

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

// Route for authentication handling
app.use("/auth", auth_router);

// Route for project handling
app.use("/project", project_router);

// Route for ticket handling
app.use("/ticket", ticket_router);

// Route for sprint handling
app.use("/sprint", sprint_router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

