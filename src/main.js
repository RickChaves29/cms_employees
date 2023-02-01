import listAllDepartments from "./data/repositories/list_department.repository.js";

async function main() {
  console.log(await listAllDepartments());
}
main();
