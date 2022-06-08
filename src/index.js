require('dotenv').config();
const { config } = require('./config');
const PORT = config.port;
const createApp = require('./app');
require('./database');

const app = createApp();
app
  .then((app) => {
    app.listen(PORT, (err) => {
      if (err) {
        console.error('Error: ', err);
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });
