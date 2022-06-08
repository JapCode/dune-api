const mongoLib = require('../lib/mongoLib');

class CharacterService {
  constructor(collection) {
    this.mongoDB = new mongoLib(collection);
  }
  getCharacters(query) {
    return this.mongoDB.getAll(query);
  }
  getCharacter(id) {
    return this.mongoDB.getSingle(id);
  }
  updateCharacter(id, data) {
    return this.mongoDB.update(id, data);
  }
  createCharacter(data) {
    return this.mongoDB.create(data);
  }
  deleteCharacter(id) {
    return this.mongoDB.delete(id);
  }
}
module.exports = CharacterService;
