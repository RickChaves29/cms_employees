class RoleRepository {
  #repository;
  constructor(repository) {
    this.#repository = repository;
  }
  async findAll() {
    const [rows, _] = await this._repository.query(`
    SELECT role.id, role.title, role.salary, department.name
    FROM role
    INNER JOIN department ON role.department_id=department.id`);
    return rows;
  }
  async findOnlyRoles() {
    const [rows, _] = await this.#repository.query(`
    SELECT role.id, role.title AS name
    FROM role`);
    return rows;
  }
  async getID(name) {
    const [[{ id }], _] = await this.#repository.query(
      `
    SELECT role.id FROM role WHERE role.title = ?`,
      [name]
    );
    return id;
  }

  async create(departmentID, title, salary) {
    await this.#repository.execute(
      `INSERT INTO role (department_id, title, salary) 
    VALUES (?,?,?)`,
      [+departmentID, title, +salary]
    );
  }
}

export default RoleRepository;
