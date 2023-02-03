import mysql from "mysql2/promise";

const connDB = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "cms",
  port: "3306",
});

export default connDB;
