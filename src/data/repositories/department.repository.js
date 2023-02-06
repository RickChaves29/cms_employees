class DepartmentRepository {
  #repository;
  constructor(repository) {
    this.#repository = repository;
  }
  async getID(name) {
    const [[{ id }], _] = await this.#repository.execute(
      `SELECT * FROM department WHERE department.name = ?`,
      [name]
    );
    return id;
  }
  async findAll() {
    const [rows, _] = await this.#repository.query(`SELECT * FROM department`);
    return rows;
  }

  async create(name) {
    await this.#repository.execute(`INSERT INTO department (name) VALUES (?)`, [
      name,
    ]);
  }
}

export default DepartmentRepository;
