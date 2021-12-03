const express = require('express');
const router = express.Router();
// const registerController = '/controllers/register';
// const loginController from '/controllers/login';
router.get('/login', (req, res) => {
  res.send('login');
});

// router.post('/register', registerController);

module.exports = router;
