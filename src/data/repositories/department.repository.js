import util from "util";

class DepartmentRepository {
  constructor(repository) {
    this._repository = repository;
  }
  async findAll() {
    const query = util.promisify(this._repository.query).bind(this._repository);
    const data = await query(`SELECT * FROM department`);
    this._repository.end();
    return data;
  }
  async create(name) {
    await this._repository.execute(`INSERT INTO department (name) VALUES (?)`, [
      name,
    ]);
    this._repository.end();
  }
}

export default DepartmentRepository;
