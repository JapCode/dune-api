const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginRoute = require('express').Router();
const User = require('../schemas/userSchema');

loginRoute.post('/', async (req, res) => {
  const { body } = req;
  const { username, password } = body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'Wrong username or password',
    });
  }
  const userForToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60 * 24 * 7,
  });
  res.send({
    name: user.name,
    username: user.username,
    token,
  });
});

module.exports = loginRoute;
