require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
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

app.use(cors());
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
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    // console.log(res, err);
    throw err;
  });

app.listen(PORT);
