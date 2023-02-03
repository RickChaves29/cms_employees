class DepartmentRepository {
  constructor(repository) {
    this._repository = repository;
  }
  async getID(name) {
    const [[{ id }], _] = await this._repository.execute(
      `SELECT * FROM department WHERE department.name = ?`,
      [name]
    );
    return id;
  }
  async findAll() {
    const [rows, _] = await this._repository.query(`SELECT * FROM department`);
    return rows;
  }

  async create(name) {
    await this._repository.execute(`INSERT INTO department (name) VALUES (?)`, [
      name,
    ]);
  }
}

export default DepartmentRepository;
