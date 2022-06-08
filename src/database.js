const mongoose = require('mongoose');
const { config } = require('./config');

const MONGO_DB_URI = config.dbUrl;
const dbConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: config.dbName,
};
mongoose
  .connect(MONGO_DB_URI, dbConfig)
  .then(() => {
    console.log('connected to mongo');
  })
  .catch((err) => {
    console.log('error', err);
  });
