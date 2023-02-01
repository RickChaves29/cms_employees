import connDB from "../database/connectionDB.js";
import util from "util";
const listAllDepartments = async () => {
  const query = util.promisify(connDB.query).bind(connDB);
  const data = await query(`SELECT * FROM department`);
  return data;
};

export default listAllDepartments;
