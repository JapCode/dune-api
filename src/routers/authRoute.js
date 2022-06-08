// const { isUser } = require('../middleware/authJwt');
// const userExtractor = require('../middleware/userExtractor');
const { isAdmin, isInvited, isOwner } = require('../middleware/authJwt');
const userExtractor = require('../middleware/userExtractor');
const UserService = require('../services/userService');
const userService = new UserService();
const authRoute = require('express').Router();

authRoute.get('/', async (req, res) => {
  res.status(200).json({ message: 'Hello' });
});
authRoute.delete('/:id', [userExtractor, isOwner], async (req, res, next) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    next(error);
  }
});
authRoute.patch('/:id', [userExtractor, isOwner], async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const user = await userService.updateUser(id, body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});
authRoute.post(
  '/register',
  [userExtractor, isInvited],
  async (req, res, next) => {
    try {
      await userService.createUser(req.body);
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      next(error);
    }
  },
);
authRoute.post('/login', async (req, res, next) => {
  try {
    const { body } = req;
    const userSingIn = await userService.login(body);
    res.status(200).json(userSingIn);
  } catch (error) {
    next(error);
  }
});
authRoute.post(
  '/invitation',
  [userExtractor, isAdmin],
  async (req, res, next) => {
    try {
      const { body } = req;
      const invitation = await userService.invitation(body);
      res.status(201).json({
        message: 'Invitation token generated',
        token: invitation,
      });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = authRoute;
