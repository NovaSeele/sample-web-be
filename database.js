import mysql from "mysql2";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST, 
  port: process.env.MYSQL_PORT, 
  user: process.env.MYSQL_USER, 
  password: process.env.MYSQL_PASSWORD, 
  database: process.env.MYSQL_DB_NAME, 
  ssl: {
    ca: fs.readFileSync("./certs/ca.pem"),
  },
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

export default db;
