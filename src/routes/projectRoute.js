import express from "express";
import {
    userProjectPermission,
} from "../controllers/project_controller/permission.js";

import {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
} from "../controllers/project_controller/CRUD.js";

// Define the router
const project_router = express.Router();

// CRUD operations
project_router.post("/create-project", createProject);
project_router.get("/get-all-projects", getAllProjects);
project_router.get("/get-project-by-id/:id", getProjectById);
project_router.put("/update-project", updateProject);
project_router.delete("/delete-project/:id", deleteProject);

project_router.post("/user-project-permission", userProjectPermission);

export default project_router;
