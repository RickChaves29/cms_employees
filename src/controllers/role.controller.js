import inquirer from "inquirer";
import connDB from "../data/database/connectionDB.js";
import mainController from "./main.controller.js";
import RoleRepository from "../data/repositories/role.repository.js";
import DepartmentRepository from "../data/repositories/department.repository.js";
export default function roleController() {
  const roleRepository = new RoleRepository(connDB);
  inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Job roles",
        choices: [
          { name: "List all job roles", value: "list" },
          { name: "Add new job role", value: "create" },
          { name: "<- Back", value: "back" },
          { name: "Exit", value: "exit" },
        ],
      },
    ])
    .then(async ({ role }) => {
      switch (role) {
        case "create":
          createNewRole();
          break;
        case "list":
          console.table(await roleRepository.findAll());
          roleController();
          break;
        case "back":
          mainController();
          break;
        default:
          process.exit(0);
      }
    });
}

async function createNewRole() {
  const departmentRepository = new DepartmentRepository(connDB);
  const roleRepository = new RoleRepository(connDB);
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Job role name:",
      },
      {
        name: "salary",
        type: "input",
        message: "Salary:",
      },
      {
        name: "department",
        type: "rawlist",
        message: "department:",
        choices: await departmentRepository.findAll(),
      },
    ])
    .then(async ({ name, salary, department }) => {
      const departmentID = await departmentRepository.getID(department);
      roleRepository.create(departmentID, name, salary);
      roleController();
    });
}
