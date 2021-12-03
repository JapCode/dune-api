const inquirer = require('inquirer');
const bcrypt = require('bcrypt');
const register = require('../controllers/register');
const userData = [
  {
    username: '',
    email: '',
    password: '',
  },
];

inquirer
  .prompt([
    {
      type: 'input',
      name: 'username',
      message: 'What is your username?',
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email?',
    },
    {
      type: 'password',
      name: 'password',
      message: 'What is your password?',
    },
    {
      type: 'input',
      name: 'role',
      message: 'What is your role?',
    },
  ])
  .then((answers) => {
    const saltRounds = 10;
    const { username, email, role } = answers;
    bcrypt.hash(answers.password, saltRounds).then((passwordHash) => {
      userData[0].username = username;
      userData[0].email = email;
      userData[0].password = passwordHash;
      userData[0].role = role;
      register(userData);
    });
  })
  .catch((err) => {
    throw err.message;
  });
