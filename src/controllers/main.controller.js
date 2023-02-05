import inquirer from "inquirer";
import departmentController from "./department.controller.js";
import employeeController from "./employee.controller.js";

export default function mainController() {
  inquirer
    .prompt([
      {
        name: "cms",
        message: "Choose what your manager today",
        type: "list",
        choices: [
          {
            name: "Manager department",
            value: "managerDepartment",
          },
          {
            name: "Manager roles",
            value: "managerRole",
          },

          {
            name: "Manager employees",
            value: "managerEmployee",
          },
          {
            name: "Exit",
            value: "exit",
          },
        ],
      },
    ])
    .then(({ cms }) => {
      switch (cms) {
        case "managerDepartment":
          departmentController();
          break;
        case "managerEmployee":
          employeeController();
          break;
        default:
          process.exit(0);
      }
    });
}
