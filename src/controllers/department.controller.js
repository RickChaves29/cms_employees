import inquirer from "inquirer";
import mainController from "./main.controller.js";
import connDB from "../data/database/connectionDB.js";
import DepartmentRepository from "../data/repositories/department.repository.js";

export default function departmentController() {
  const departmentRepository = new DepartmentRepository(connDB);
  inquirer
    .prompt([
      {
        type: "list",
        name: "department",
        message: "Department",
        choices: [
          { name: "List all department", value: "list" },
          { name: "Add new department", value: "create" },
          { name: "<- Back", value: "back" },
          { name: "Exit", value: "exit" },
        ],
      },
    ])
    .then(async ({ department }) => {
      switch (department) {
        case "create":
          createNewDepartment();

          break;
        case "list":
          console.table(await departmentRepository.findAll());
          departmentController();
          break;
        case "back":
          mainController();
          break;
        default:
          process.exit(0);
      }
    });
}

function createNewDepartment() {
  const departmentRepository = new DepartmentRepository(connDB);

  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Name of department",
      },
    ])
    .then(({ name }) => {
      name.trim();
      if (name == "" || name == null || name == undefined) {
        console.warn("warn: name is a incorrect");
      } else {
        departmentRepository.create(name);
        console.log("Success");
      }
      departmentController();
    });
}
