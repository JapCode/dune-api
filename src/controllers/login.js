const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../schemas/userSchema');

const login = async (data) => {
  const { username, password } = data;
  try {
    const user = await User.findOne({ username });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);

    if (!(user && passwordCorrect)) {
      const loginError = new Error('Invalid username or password');
      loginError.name = 'invalidCredentials';
      throw loginError;
      // throw new Error('Invalid username or password');
      // return res.status(401).json({
      //   error: 'Wrong username or password',
      // });
    }
    const userForToken = {
      username: user.username,
      role: user.roles,
      id: user._id,
    };
    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 60 * 24 * 7,
    });
    const result = {
      user: user.username,
      token: token,
    };

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = login;
