import knex from "../../../database.js";

const createEpicTicket = async (req, res) => {
  const { epic, ticket } = req.body;

  if (!epic || !ticket) {
    return res
      .status(400)
      .json({ message: "Epic ID and Ticket ID are required" });
  }

  try {
    // Check if the epic and ticket exist
    const existingEpic = await knex("epics").where({ id: epic }).first();
    const existingTicket = await knex("tickets").where({ id: ticket }).first();

    if (!existingEpic || !existingTicket) {
      return res.status(404).json({ message: "Epic or Ticket not found" });
    }

    // Insert the new epic_ticket
    const [newEpicTicket] = await knex("epic_tickets")
      .insert({
        epic,
        ticket,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      })
      .returning("*");

    res.status(201).json({
      message: "Epic Ticket created successfully",
      epic_ticket: newEpicTicket,
    });
  } catch (error) {
    console.error("Error creating epic ticket:", error);
    res.status(500).json({ message: "Error creating epic ticket" });
  }
};

const getEpicTicketById = async (req, res) => {
  const { id } = req.params;

  try {
    const epicTicket = await knex("epic_tickets")
      .where({ id })
      .join("epics", "epic_tickets.epic", "=", "epics.id")
      .join("tickets", "epic_tickets.ticket", "=", "tickets.id")
      .select(
        "epic_tickets.id",
        "epics.name as epic_name",
        "tickets.title",
        "epic_tickets.created_at"
      );

    if (!epicTicket) {
      return res
        .status(404)
        .json({ message: `Epic Ticket with ID ${id} not found` });
    }

    res.status(200).json({
      message: "Epic Ticket retrieved successfully",
      epicTicket,
    });
  } catch (error) {
    console.error("Error fetching epic ticket:", error);
    res.status(500).json({ message: "Error fetching epic ticket" });
  }
};

const updateEpicTicket = async (req, res) => {
  const { id } = req.params;
  const { epic, ticket } = req.body;

  if (!epic || !ticket) {
    return res
      .status(400)
      .json({ message: "Epic ID and Ticket ID are required" });
  }

  try {
    // Check if the epic and ticket exist
    const existingEpic = await knex("epics").where({ id: epic }).first();
    const existingTicket = await knex("tickets").where({ id: ticket }).first();

    if (!existingEpic || !existingTicket) {
      return res.status(404).json({ message: "Epic or Ticket not found" });
    }

    const updatedEpicTicket = await knex("epic_tickets")
      .where({ id })
      .update({
        epic,
        ticket,
        updated_at: knex.fn.now(),
      })
      .returning("*");

    if (updatedEpicTicket.length === 0) {
      return res
        .status(404)
        .json({ message: `Epic Ticket with ID ${id} not found` });
    }

    res.status(200).json({
      message: "Epic Ticket updated successfully",
      epicTicket: updatedEpicTicket[0],
    });
  } catch (error) {
    console.error("Error updating epic ticket:", error);
    res.status(500).json({ message: "Error updating epic ticket" });
  }
};

const deleteEpicTicket = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEpicTicket = await knex("epic_tickets").where({ id }).del();

    if (deletedEpicTicket === 0) {
      return res
        .status(404)
        .json({ message: `Epic Ticket with ID ${id} not found` });
    }

    res.status(200).json({
      message: "Epic Ticket deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting epic ticket:", error);
    res.status(500).json({ message: "Error deleting epic ticket" });
  }
};

const getAllTicketInAnEpicTicket = async (req, res) => {
  const { epic_id } = req.params;

  try {
    // Fetch all tickets associated with the given epic_id from the epic_tickets table
    const ticketsInEpic = await knex("epic_tickets")
      .where({ epic: epic_id })
      .join("tickets", "epic_tickets.ticket", "=", "tickets.id")
      .select(
        "tickets.id",
        "tickets.title",
        "tickets.description",
        "tickets.status",
        "tickets.priority",
        "tickets.created_at",
        "tickets.updated_at"
      );

    if (ticketsInEpic.length === 0) {
      return res
        .status(404)
        .json({ message: `No tickets found for epic ID ${epic_id}` });
    }

    res.status(200).json({
      message: "Tickets in Epic retrieved successfully",
      tickets: ticketsInEpic,
    });
  } catch (error) {
    console.error("Error fetching tickets in epic:", error);
    res.status(500).json({ message: "Error fetching tickets in epic" });
  }
};

export {
  createEpicTicket,
  getEpicTicketById,
  updateEpicTicket,
  deleteEpicTicket,
  getAllTicketInAnEpicTicket,
};
