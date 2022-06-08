const generateInvitationToken = require('../controllers/invitation');
const login = require('../controllers/login');
const register = require('../controllers/register');
const MongoLib = require('../lib/mongoLib');
const { User } = require('../schemas/userSchema');
class UserService {
  constructor() {
    this.mongo = new MongoLib(User);
  }
  async getAllUsers() {
    return this.mongo.getAll();
  }
  async login(data) {
    return login(data);
  }
  async createUser(data) {
    await register(data);
  }
  async deleteUser(id) {
    await this.mongo.delete(id);
  }
  async getUser(id) {
    return this.mongo.getSingle(id);
  }
  async updateUser(id, data) {
    return this.mongo.update(id, data);
  }
  async invitation(data) {
    return generateInvitationToken(data);
  }
}
module.exports = UserService;
