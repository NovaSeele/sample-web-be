import knex from "../../../database.js";

const createSprint = async (req, res) => {
  const { project, title, description, start_date, end_date, status, user_created } =
    req.body;

  if (!project || !title || !description || !start_date || !end_date || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (parent) {
    const parentExists = await knex("tickets").where({ id: parent }).first();
    if (!parentExists) {
      return res.status(400).json({ message: "Parent ticket does not exist" });
    }
  }

  try {
    const [newSprint] = await knex("sprints")
      .insert({
        title,
        description,
        start_date: start_date,
        end_date: end_date,
        status,
        project,
        user_created,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      })
      .returning("*");

    res.status(201).json({
      message: "Sprint created successfully",
      sprint: newSprint,
    });
  } catch (error) {
    console.error("Error creating sprint:", error);
    res.status(500).json({ message: "Error creating sprint" });
  }
};

const getSprintById = async (req, res) => {
  const { id } = req.params;

  try {
    const sprint = await knex("sprints").where({ id }).first();

    if (!sprint) {
      return res
        .status(404)
        .json({ message: `Sprint with ID ${id} not found` });
    }

    res.status(200).json({
      message: "Sprint retrieved successfully",
      sprint,
    });
  } catch (error) {
    console.error("Error fetching sprint:", error);
    res.status(500).json({ message: "Error fetching sprint" });
  }
};

const updateSprint = async (req, res) => {
  const { id } = req.params;
  const { title, description, start_date, end_date, user_updated } = req.body;

  if (!title && !description && !start_date && !end_date) {
    return res.status(400).json({ message: "At least one of title, description, start_date, or end_date is required" });
  }

  try {
    const updateFields = {};
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (start_date) updateFields.start_date = start_date;
    if (end_date) updateFields.end_date = end_date;
    updateFields.user_updated = user_updated;
    updateFields.updated_at = knex.fn.now();

    const updatedSprint = await knex("sprints")
      .where({ id })
      .update(updateFields)
      .returning("*");

    if (!updatedSprint) {
      return res
        .status(404)
        .json({ message: `Sprint with ID ${id} not found` });
    }

    res.status(200).json({
      message: "Sprint updated successfully",
      sprint: updatedSprint[0],
      data_updated: updateFields,
    });
  } catch (error) {
    console.error("Error updating sprint:", error);
    res.status(500).json({ message: "Error updating sprint" });
  }
};

const deleteSprint = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSprint = await knex("sprints").where({ id }).del();

    if (!deletedSprint) {
      return res
        .status(404)
        .json({ message: `Sprint with ID ${id} not found` });
    }

    res.status(200).json({
      message: "Sprint deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting sprint:", error);
    res.status(500).json({ message: "Error deleting sprint" });
  }
};

export {
  createSprint,
  getSprintById,
  updateSprint,
  deleteSprint,
};
