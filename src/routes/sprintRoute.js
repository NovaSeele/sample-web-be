import express from "express";

import {
  createSprint,
  getSprintById,
  updateSprint,
  deleteSprint,
} from "../controllers/sprint_controller/CRUD_sprints.js";

// Define the router
const sprint_router = express.Router();

// CRUD operations
sprint_router.post("/create-sprint", createSprint);
sprint_router.get("/get-sprint-by-id/:id", getSprintById);
sprint_router.put("/update-sprint/:id", updateSprint);
sprint_router.delete("/delete-sprint/:id", deleteSprint);

export default sprint_router;
