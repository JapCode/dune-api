const ERROR_HANDLERS = {
  CastError: (res) =>
    res.status(404).json({
      error: 'id used is invalid',
    }),
  invalidCredentials: (res) =>
    res.status(401).json({
      error: 'Invalid username or password',
    }),
  MongoServerError: (res, err) => {
    if (err.code === 11000) {
      res.status(400).json({
        error: 'duplicate key error collection',
      });
    }
  },

  validationError: (res, { message }) =>
    res.status(409).send({
      error: message,
    }),
  JsonWebTokenError: (res) =>
    res.status(401).json({
      error: 'Invalid or missing token',
    }),
  tokenExpiredError: (res) => res.status(401).json({ error: 'Token expired' }),

  default: (res) =>
    res.status(500).send({ error: 'Internal server error' }).end(),
};

// eslint-disable-next-line no-unused-vars
module.exports = (error, req, res, next) => {
  console.log(error.code);
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.default;
  handler(res, error);
};

// function handleErrors(error, req, res) {
//   console.log('pow');
//   console.log(error.name);
//   const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.default;
//   handler(res, error);
// }
// module.exports = handleErrors;
