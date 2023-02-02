import connDB from "../../database/connectionDB.js";
import util from "util";
const listAllEmployees = async () => {
  const query = util.promisify(connDB.query).bind(connDB);
  const data = await query(`SELECT * FROM employee`);
  return data;
};

export default listAllEmployees;
