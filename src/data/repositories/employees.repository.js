import util from "util";

class EmployeeRepository {
  constructor(repository) {
    this._repository = repository;
  }
  async findAll() {
    const query = util.promisify(this._repository.query).bind(this._repository);
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
    this._repository.end();
    return data;
  }
}
export default EmployeeRepository;
