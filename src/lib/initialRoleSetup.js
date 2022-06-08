const Role = require('../schemas/roleSchema');

const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;
    console.log('creating roles');
    const values = await Promise.all([
      new Role({ name: 'user' }).save(),
      new Role({ name: 'moderator' }).save(),
      new Role({ name: 'admin' }).save(),
    ]);
    console.log(values);
    return values;
  } catch (error) {
    throw error.message;
  }
};

module.exports = {
  createRoles: createRoles,
};
