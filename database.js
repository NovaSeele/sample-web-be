import mysql from "mysql2";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST, //"mysql-pmify-novaseele262003-pmify.i.aivencloud.com"
  port: process.env.MYSQL_PORT, //"14091"
  user: process.env.MYSQL_USER, //"avnadmin"
  password: process.env.MYSQL_PASSWORD, //"AVNS_PAfUYhp60F8I6mvc16a"
  database: process.env.MYSQL_DB_NAME, //"pmify"
  ssl: {
    ca: fs.readFileSync("./certs/ca.pem"), // Path to the Aiven SSL certificate
  },
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

export default db;
