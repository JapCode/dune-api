const express = require('express');
const cors = require('cors');
const routerApi = require('./routers/index');
const methodOverride = require('method-override');
const {
  boomErrorHandler,
  logErrors,
} = require('./middleware/handlerErrorBoom');
const { createRoles } = require('./lib/initialRoleSetup');
const handleErrors = require('./middleware/handleErrors');

const createApp = async () => {
  const app = express();
  await createRoles();
  app.use(cors());
  app.use(methodOverride());
  app.use(express.json());
  routerApi(app);
  app.use(handleErrors);
  app.use(logErrors);
  app.use(boomErrorHandler);

  return app;
};
module.exports = createApp;
