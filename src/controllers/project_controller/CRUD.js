import knex from "../../../database.js";

const createProject = async (req, res) => {
  const { title, avatar, description, start_date, status, user_created } =
    req.body;

  if (!title || !avatar || !description || !start_date || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [newProject] = await knex("projects")
      .insert({
        title,
        avatar,
        description,
        start_date,
        status,
        user_created,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      })
      .returning("*");

    res.status(201).json({
      message: "Project created successfully",
      project: newProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Error creating project" });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await knex("projects").select("*");

    if (projects.length === 0) {
      return res.status(404).json({ message: "No projects found" });
    }

    res.status(200).json({
      message: "Projects retrieved successfully",
      projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Error fetching projects" });
  }
};

const getProjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await knex("projects").where({ id }).first();

    if (!project) {
      return res
        .status(404)
        .json({ message: `Project with ID ${id} not found` });
    }

    res.status(200).json({
      message: "Project retrieved successfully",
      project,
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ message: "Error fetching project" });
  }
};

const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, avatar, description, start_date, status, user_updated } =
    req.body;

  if (!title || !avatar || !description || !start_date || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updatedProject = await knex("projects")
      .where({ id })
      .update({
        title,
        avatar,
        description,
        start_date,
        status,
        user_updated,
        updated_at: knex.fn.now(),
      })
      .returning("*");

    if (!updatedProject) {
      return res
        .status(404)
        .json({ message: `Project with ID ${id} not found` });
    }

    res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject[0],
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Error updating project" });
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProject = await knex("projects").where({ id }).del();

    if (!deletedProject) {
      return res
        .status(404)
        .json({ message: `Project with ID ${id} not found` });
    }

    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Error deleting project" });
  }
};

export {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
};
