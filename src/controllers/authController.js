import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import knex from "../../database.js";

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if email already exists
    const existingUser = await knex("users").where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Insert the new user into the database
    const [newUserId] = await knex("users").insert({
      name: name,
      email,
      password, // Remember to hash the password before storing it in a real application
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    });

    res.status(201).json({
      message: "User created successfully",
      userId: newUserId,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Check if user exists
    const user = await knex("users").where({ email }).first();
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Verify password (assuming passwords are stored hashed)
    // Replace with proper hashing check, e.g., bcrypt.compare
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      id: user.id,
      name: user.name,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error during login" });
  }
};

const checkPermission = async (req, res) => {
  const { id, role } = req.body;

  // Validate input
  if (!id || !role) {
    return res
      .status(400)
      .json({ message: "User ID and permission are required" });
  }

  try {
    // Check if the user has the specified permission
    const user = await knex("users").where({ id: id }).first();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userPermission = await knex("permissions")
      .where({ user: id, role: role })
      .first();

    if (!userPermission) {
      return res.status(403).json({ message: "Permission denied" });
    }

    res.status(200).json({ message: "Permission granted" });
  } catch (error) {
    console.error("Error checking permission:", error);
    res.status(500).json({ message: "Error checking permission" });
  }
};

const addPermission = async (req, res) => {
  const { id, role } = req.body;

  // Validate input
  if (!id || !role) {
    return res
      .status(400)
      .json({ message: "User ID and permission are required" });
  }

  try {
    // Find the user by ID
    const user = await knex("users").where({ id: id }).first();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the permission for the user
    await knex("permissions").insert({
      user: id,
      role: role,
      created_at: knex.fn.now(),
    });

    res.status(201).json({ message: "Permission added successfully" });
  } catch (error) {
    console.error("Error adding permission:", error);
    res.status(500).json({ message: "Error adding permission" });
  }
};


export { login, signup, checkPermission, addPermission };
