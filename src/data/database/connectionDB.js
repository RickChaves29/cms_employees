import mysql from "mysql2";

const connDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "cms",
  port: "3306",
});

connDB.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

export default connDB;
