const mongoose = require('mongoose');
// const { config } = require('../../config');
const MONGO_DB_URI =
  'mongodb://testUser:test123@localhost:27017/?authMechanism=DEFAULT';
const dbConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'mongotest',
};

const dbConnection = () => {
  mongoose
    .connect(MONGO_DB_URI, dbConfig)
    .then(() => {
      console.log('connected to mongo');
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = { dbConnection };
