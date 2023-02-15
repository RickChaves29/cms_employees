#! /usr/bin/env node
import mainController from "./controllers/main.controller.js";
import connDB from "./data/database/connectionDB.js";

async function main() {
  try {
    await connDB.execute(`
    CREATE TABLE IF NOT EXISTS department (
      id TINYINT AUTO_INCREMENT,
      name VARCHAR(30) NOT NULL,
      PRIMARY KEY(id)
    )
    `);
    await connDB.execute(`
    \n
    CREATE TABLE IF NOT EXISTS role (
      id TINYINT AUTO_INCREMENT,
      department_id TINYINT NOT NULL,
      title VARCHAR(50) NOT NULL,
      salary DECIMAL(10,2) NOT NULL,
      PRIMARY KEY(id),
      CONSTRAINT fk_role_depart
      FOREIGN KEY (department_id) REFERENCES department(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
    );
    `);
    await connDB.execute(`
    CREATE TABLE IF NOT EXISTS employee (
      id SMALLINT AUTO_INCREMENT,
      first_name VARCHAR(30) NOT NULL,
      last_name VARCHAR(30) NOT NULL,
      role_id TINYINT NOT NULL,
      manager_id SMALLINT,
      PRIMARY KEY(id),
      CONSTRAINT fk_employee_role
      FOREIGN KEY (role_id) REFERENCES role(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
      CONSTRAINT fk_employee_manager
      FOREIGN KEY (manager_id) REFERENCES employee(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
    );
    `);
  } catch (error) {
    console.error(error.message);
  }
  mainController();
}
main();
