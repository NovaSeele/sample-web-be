import knex from "../../../database.js";

// Setting the user permission in a project
const userProjectPermission = async (req, res) => {
  const { project, user, permission } = req.body;

  // Validate input
  if (!project || !user || !permission) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Insert the new project permission into the database
    const [newPermission] = await knex("project_permissions")
      .insert({
        project,
        user,
        permission,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      })
      .returning([
        "id",
        "project",
        "user",
        "permission",
        "created_at",
        "updated_at",
      ]);

    // Return the newly created permission info
    res.status(201).json({
      message: "Project permission created successfully",
      permission: newPermission,
    });
  } catch (error) {
    console.error("Error creating project permission:", error);
    res.status(500).json({ message: "Error creating project permission" });
  }
};

export { userProjectPermission };
