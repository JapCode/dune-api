const ERROR_HANDLERS = {
  castError: (res) =>
    res.status(400).send({
      error: 'id used is invalid',
    }),
  validationError: (res, { message }) =>
    res.status(409).send({
      error: message,
    }),
  JsonWebTokenError: (res) =>
    res.status(401).json({
      error: 'Invalid or missing token',
    }),
  tokenExpiredError: (res) => res.status(401).json({ error: 'Token expired' }),

  default: (res) => res.status(500).end(),
};
module.exports = (error, res) => {
  console.error(error.name);
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.default;
  handler(res, error);
};
