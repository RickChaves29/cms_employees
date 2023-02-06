class EmployeeRepository {
  #repository;
  constructor(repository) {
    this.#repository = repository;
  }
  async findAll() {
    const [rows, _] = await this.#repository.query(`
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
    return rows;
  }
  async findOnlyManager() {
    const [rows, _] = await this.#repository.query(
      `SELECT employee.id, employee.first_name AS name FROM employee WHERE manager_id IS NULL`
    );

    return rows;
  }
  async getID(name) {
    const [[{ id }], _] = await this.#repository.query(
      `SELECT employee.id FROM employee WHERE employee.first_name = ?`,
      [name]
    );
    return id;
  }

  async create(firstName, lastName, role, manager) {
    let insert;
    let columns;
    if (manager === null || manager === undefined) {
      insert = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,null)`;
      columns = [firstName, lastName, +role];
    } else {
      insert = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
      columns = [firstName, lastName, +role, +manager];
    }
    await this.#repository.execute(insert, columns);
  }
}
export default EmployeeRepository;
