const express = require('express');
const characterRoute = require('./charactersRoute');
const authRoute = require('./authRoute');
const register = require('../controllers/register');
const login = require('../controllers/login');
// const validateHandler = require('../middleware/validateHandler');
// const { validateUser } = require('../schemas/charactersSchema');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/characters', characterRoute);
  router.use('/auth', authRoute);
  router.use('/register', register);
  router.use('/login', login);
}

module.exports = routerApi;
