import connDB from "../../database/connectionDB.js";

const createNewDepartment = async (name) => {
  await connDB.execute(`INSERT INTO department (name) VALUES (?)`, [name]);
};

export default createNewDepartment;
