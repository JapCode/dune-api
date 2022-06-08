const Role = require('../schemas/roleSchema');
const bcrypt = require('bcrypt');
const { User } = require('../schemas/userSchema');
require('dotenv').config();

const register = async (Data) => {
  try {
    const { username, email, password, roles } = Data;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    let rolToSet;
    if (roles) {
      const foundRole = await Role.findOne({ name: { $in: roles } });
      rolToSet = await foundRole._id;
    } else {
      const role = await Role.findOne({ name: 'user' });
      rolToSet = [role._id];
    }
    const user = {
      username: username,
      email: email,
      password: passwordHash,
      roles: rolToSet,
    };
    await User.create(user);
  } catch (error) {
    throw error.message;
  }
};

module.exports = register;
