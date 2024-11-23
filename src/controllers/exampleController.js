import { exampleSuccessMessage } from "../services/exampleService.js";

export const exampleGet = async (req, res) => {
  try {
    res.json({ message: "Hello, world!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const examplePost = async (req, res) => {
  try {
      const { name, email } = req.body;
      const responseMessage = exampleSuccessMessage();

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    // Here you can add logic to process the data, e.g., save to a database
    res.json({ log: responseMessage, message: `Received submission from ${name} with email ${email}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

