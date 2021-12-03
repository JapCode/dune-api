const bcrypt = require('bcrypt');
require('dotenv').config();
const mongoose = require('mongoose');
const Role = require('../schemas/roleSchema');
const { User } = require('../schemas/userSchema');
const connectionString = process.env.MONGO_DB_URI;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    throw err.message;
  });

const register = async (Data) => {
  try {
    const { username, email, password, roles } = Data[0];
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = await new User({
      username: username,
      email: email,
      password: passwordHash,
      role: 'admin',
    });
    if (roles) {
      const foundRole = await Role.findOne({ name: { $in: roles } });
      user.roles = foundRole.map[(role) => role._id];
    } else {
      const role = await Role.findOne({ name: 'user' });
      user.roles = [role._id];
    }
    user.save().then(() => {
      mongoose.connection.close();
    });
  } catch (error) {
    throw error.message;
  }
};

module.exports = register;
