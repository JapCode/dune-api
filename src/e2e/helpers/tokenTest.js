const jwt = require('jsonwebtoken');
const { findElement } = require('./mongooseReset');
const testUser = require('../../faker/fakerUser');
const { User } = require('../../schemas/userSchema');

process.env.SECRET = 'Jägermeister';

const tokenTest = async () => {
  const userFinder = await findElement(User, testUser.username);
  const userForToken = {
    username: userFinder.username,
    id: userFinder._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: '60s',
  });
  return token;
};
module.exports = tokenTest;
