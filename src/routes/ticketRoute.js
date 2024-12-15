import express from "express";
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} from "../controllers/ticket_controller/CRUD.js";

// Define the router
const ticket_router = express.Router();

// CRUD operations
ticket_router.post("/create-ticket", createTicket);
ticket_router.get("/get-all-tickets", getAllTickets);
ticket_router.get("/get-ticket-by-id/:id", getTicketById);
ticket_router.put("/update-ticket/:id", updateTicket);
ticket_router.delete("/delete-ticket/:id", deleteTicket);

export default ticket_router;
