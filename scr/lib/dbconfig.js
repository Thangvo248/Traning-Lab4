import mysql from "mysql2";

// Create a connection to the database
const connections = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "231236",
  database: "blog",
});
// open the MySQL connection
connections.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});
export default connections;
