class MongoLib {
  constructor(collection) {
    this.collection = collection;
  }
  async getAll() {
    return this.collection.find({});
  }

  async getSingle(id) {
    return this.collection.findById(id);
  }
  async update(id, data) {
    await this.collection.findByIdAndUpdate(id, data);
    return this.getSingle(id);
  }
  async create(data) {
    return this.collection.create(data);
  }
  async delete(id) {
    return this.collection.findByIdAndDelete(id);
  }
}

module.exports = MongoLib;
