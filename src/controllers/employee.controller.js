import inquirer from "inquirer";
import mainController from "./main.controller.js";
import connDB from "../data/database/connectionDB.js";
import EmployeeRepository from "../data/repositories/employees.repository.js";
import RoleRepository from "../data/repositories/role.repository.js";

export default function employeeController() {
  const employeeRepository = new EmployeeRepository(connDB);
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Employees",
        choices: [
          { name: "List all employees", value: "list" },
          { name: "Add new employee", value: "create" },
          { name: "<- Back", value: "back" },
          { name: "Exit", value: "exit" },
        ],
      },
    ])
    .then(async ({ employee }) => {
      switch (employee) {
        case "create":
          createNewEmployees();
          break;
        case "list":
          console.table(await employeeRepository.findAll());
          employeeController();
          break;
        case "back":
          mainController();
          break;
        default:
          process.exit(0);
      }
    });
}

async function createNewEmployees() {
  const employeeRepository = new EmployeeRepository(connDB);
  const roleRepository = new RoleRepository(connDB);
  const arrayManager = await employeeRepository.findOnlyManager();
  arrayManager.push({ id: null, name: "Not has manager" });

  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "first name:",
      },
      {
        name: "lastName",
        type: "input",
        message: "last name:",
      },
      {
        name: "role",
        type: "rawlist",
        message: "role job:",
        choices: await roleRepository.findOnlyRoles(),
      },
      {
        name: "manager",
        type: "rawlist",
        message: "Name of manager:",
        choices: arrayManager,
      },
    ])
    .then(async ({ firstName, lastName, role, manager }) => {
      const roleID = await roleRepository.getID(role);
      if (manager === "Not has manager") {
        employeeRepository.create(firstName, lastName, roleID, null);
      } else {
        const managerID = await employeeRepository.getID(manager);
        employeeRepository.create(firstName, lastName, roleID, managerID);
      }
      employeeController();
    });
}
