import connDB from "../../database/connectionDB.js";
import util from "util";
const listAllRoles = async () => {
  const query = util.promisify(connDB.query).bind(connDB);
  const data = await query(`
  SELECT role.id, role.title, role.salary, department.name
  FROM role
  INNER JOIN department ON role.department_id=department.id`);

  return data;
};

export default listAllRoles;
