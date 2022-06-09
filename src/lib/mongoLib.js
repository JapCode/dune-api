class MongoLib {
  constructor(collection) {
    this.collection = collection;
  }
  async getAll(query) {
    const limit = parseInt(query.limit) || 10;
    const page = parseInt(query.page) || 1;
    return this.collection.paginate(
      {},
      {
        limit,
        page,
        customLabels: {
          docs: 'CharactersList',
        },
      },
    );
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
