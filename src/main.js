import inquirer from "inquirer";
import connDB from "./data/database/connectionDB.js";
import DepartmentRepository from "./data/repositories/department.repository.js";
import EmployeeRepository from "./data/repositories/employees.repository.js";
import RoleRepository from "./data/repositories/role.repository.js.js";

async function main() {
  const prompt = inquirer.createPromptModule();
  const departmentRepository = new DepartmentRepository(connDB);
  const roleRepository = new RoleRepository(connDB);
  const employeeRepository = new EmployeeRepository(connDB);
  prompt([
    {
      type: "list",
      name: "cmsPrompt",
      message: "Welcome to CMS for your industy:",
      choices: [
        {
          type: "separator",
          line: "----------- What you can do today on CMS Prompt ? ---------",
        },
        { name: "to view departments", value: "departments" },
        { name: "to view roles", value: "roles" },
        { name: "to view employees", value: "employees" },
        { type: "separator", line: "----------------" },
        { name: "add new department", value: "createNewDepartment" },
        { name: "add new role", value: "createNewRole" },
        { name: "add new employee", value: "createNewEmployee" },
      ],
    },
  ]).then(async (answers) => {
    const { cmsPrompt } = answers;
    if (cmsPrompt === "departments") {
      console.table(await departmentRepository.findAll());
    } else if (cmsPrompt === "roles") {
      console.table(await roleRepository.findAll());
    } else if (cmsPrompt === "employees") {
      console.table(await employeeRepository.findAll());
    }
    if (cmsPrompt === "createNewDepartment") {
      console.table(cmsPrompt);
      prompt([
        {
          type: "input",
          name: "departmentName",
          message: "Name of new department: ",
        },
      ]).then(async (data) => {
        const { departmentName } = data;
        departmentRepository.create(departmentName);
      });
    } else if (cmsPrompt === "createNewRole") {
      console.table(cmsPrompt);
      prompt([
        {
          type: "input",
          name: "roleName",
          message: "Name of new job role: ",
        },

        {
          type: "input",
          name: "roleSalary",
          message: "Salary of new job role: ",
        },

        {
          type: "rawlist",
          name: "roleDepartment",
          message: "Choose department of new job role: ",
          choices: departments,
        },
      ]).then((data) => {
        console.log(data);
      });
    } else if (cmsPrompt === "createNewEmployee") {
      console.table(cmsPrompt);
      prompt([
        {
          type: "input",
          name: "addEmployee",
          message: "Name of new employee: ",
        },
      ]).then((data) => {
        console.log(data);
      });
    }
  });
}
main();
