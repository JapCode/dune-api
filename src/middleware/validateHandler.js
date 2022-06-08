const boom = require('@hapi/boom');

const validateHandler = (schema, property) => {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data);
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
};
const userValidationHandler = (validator) => {
  return (req, res, next) => {
    const { error } = validator(req.body);
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
};

module.exports = { validateHandler, userValidationHandler };
