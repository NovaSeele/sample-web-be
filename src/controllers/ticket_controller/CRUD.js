import knex from "../../../database.js";

const createTicket = async (req, res) => {
  const { title, status, description, summarize, assignee, reporter, parent, sprint, epic, project, user_created } = req.body;

//   if (typeof assignee !== 'number' || typeof reporter !== 'number' || typeof parent !== 'number' || 
//       typeof sprint !== 'number' || typeof epic !== 'number' || typeof project !== 'number' || 
//       typeof user_created !== 'number') {
//     return res.status(400).json({ message: "Assignee, Reporter, Parent, Sprint, Epic, Project, and User Created must be numbers" });
//   }

  if (!title || !status || !description || !summarize) {
    return res.status(400).json({ message: "Title, Status, Description, and Summarize are required" });
  }

  try {
    const [newTicket] = await knex("tickets")
      .insert({
        title,
        status,
        description,
        summarize,
        assignee,
        reporter,
        parent,
        sprint,
        epic,
        project,
        user_created,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      })
      .returning("*");

    res.status(201).json({
      message: "Ticket created successfully",
      ticket: newTicket,
    });
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ message: "Error creating ticket" });
  }
};

const getAllTickets = async (req, res) => {
  try {
    const tickets = await knex("tickets").select("*");

    if (tickets.length === 0) {
      return res.status(404).json({ message: "No tickets found" });
    }

    res.status(200).json({
      message: "Tickets retrieved successfully",
      tickets,
    });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ message: "Error fetching tickets" });
  }
};

const getTicketById = async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await knex("tickets").where({ id }).first();

    if (!ticket) {
      return res.status(404).json({ message: `Ticket with ID ${id} not found` });
    }

    res.status(200).json({
      message: "Ticket retrieved successfully",
      ticket,
    });
  } catch (error) {
    console.error("Error fetching ticket:", error);
    res.status(500).json({ message: "Error fetching ticket" });
  }
};

const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { title, status, description, summarize, assignee, reporter, parent, sprint, epic, project, user_updated } = req.body;

  if (!title || !status || !description || !summarize) {
    return res.status(400).json({ message: "Title, Status, Description, and Summarize are required" });
  }

  try {
    const updatedTicket = await knex("tickets")
      .where({ id })
      .update({
        title,
        status,
        description,
        summarize,
        assignee,
        reporter,
        parent,
        sprint,
        epic,
        project,
        user_updated,
        updated_at: knex.fn.now(),
      })
      .returning("*");

    if (!updatedTicket.length) {
      return res.status(404).json({ message: `Ticket with ID ${id} not found` });
    }

    res.status(200).json({
      message: "Ticket updated successfully",
      ticket: updatedTicket[0],
    });
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).json({ message: "Error updating ticket" });
  }
};

const deleteTicket = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTicket = await knex("tickets").where({ id }).del();

    if (!deletedTicket) {
      return res.status(404).json({ message: `Ticket with ID ${id} not found` });
    }

    res.status(200).json({
      message: "Ticket deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting ticket:", error);
    res.status(500).json({ message: "Error deleting ticket" });
  }
};

export { createTicket, getAllTickets, getTicketById, updateTicket, deleteTicket };
