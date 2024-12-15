import Knex from "knex";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// Configure Knex instance
const knex = Knex({
  client: "mysql2",
  connection: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    ssl: {
      ca: fs.readFileSync("./certs/ca.pem"),
    },
  },
  pool: { min: 2, max: 10 }, // Optional: Adjust connection pool settings
});

export default knex;
