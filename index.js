require('dotenv').config();
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const routerApi = require('./routers/index');
const PORT = process.env.PORT;
const connectionString = process.env.MONGO_DB_URI;
const { createRoles } = require('./lib/initialRoleSetup');
const {
  errorHandler,
  boomErrorHandler,
  logErrors,
} = require('./middleware/handlerErrorBoom');

createRoles();
app.use(methodOverride());

app.use(express.json());
routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    res.status(200).send('Connected to MongoDB');
    // console.log('Connected to MongoDB');
  })
  .catch((res) => {
    // console.log(err);
    res.status(500).send('Error connecting to MongoDB');
  });

app.listen(PORT);
