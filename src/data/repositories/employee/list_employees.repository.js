import connDB from "../../database/connectionDB.js";
import util from "util";
const listAllEmployees = async () => {
  const query = util.promisify(connDB.query).bind(connDB);
  const data = await query(`
  SELECT em.id, em.first_name,
  em.last_name, role.title AS "role", role.salary, 
  department.name AS "department", employee.first_name AS "manager"
  FROM employee AS em
  INNER JOIN role 
  ON em.role_id = role.id
  INNER JOIN department 
  ON role.department_id = department.id
  LEFT OUTER JOIN employee
  ON em.manager_id = employee.id`);
  return data;
};

export default listAllEmployees;
