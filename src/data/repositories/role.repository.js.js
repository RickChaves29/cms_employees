import util from "util";
class RoleRepository {
  constructor(repository) {
    this._repository = repository;
  }
  async findAll() {
    const query = util.promisify(this._repository.query).bind(this._repository);
    const data = await query(`
    SELECT role.id, role.title, role.salary, department.name
    FROM role
    INNER JOIN department ON role.department_id=department.id`);
    this._repository.end();
    return data;
  }
}

export default RoleRepository;
