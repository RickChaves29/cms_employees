import connDB from "../../database/connectionDB.js";
import util from "util";
const listAllRoles = async () => {
  const query = util.promisify(connDB.query).bind(connDB);
  const data = await query(`SELECT * FROM role`);
  return data;
};

export default listAllRoles;
