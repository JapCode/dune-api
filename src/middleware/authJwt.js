const { User } = require('../schemas/userSchema');
const Role = require('../schemas/roleSchema');

const isUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (
        roles[i].name === 'user' ||
        roles[i].name === 'moderator' ||
        roles[i].name === 'admin'
      ) {
        return next();
      }
    }
  } catch (err) {
    next(err);
  }
};

const isModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'moderator' || roles[i].name === 'admin') {
        return next();
      }
    }
    return res.status(403).json({ error: 'You are not a moderator' });
  } catch (err) {
    next(err);
  }
};
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'admin') {
        return next();
      }
    }
    return res.status(403).json({ error: 'You are not an admin' });
  } catch (err) {
    next(err);
  }
};
const isInvited = async (req, res, next) => {
  try {
    if (req.userRoles === 'invited') {
      return next();
    } else {
      const user = await User.findById(req.userId);
      const roles = await Role.find({ _id: { $in: user.roles } });
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
          return next();
        }
      }
    }
    return res.status(403).json({ error: 'You need a token' });
  } catch (err) {
    next(err);
  }
};
const isOwner = async (req, res, next) => {
  try {
    if (req.userId === req.params.id) {
      return next();
    } else if (req.userId !== req.params.id) {
      const user = await User.findById(req.userId);
      const roles = await Role.find({ _id: { $in: user.roles } });
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
          return next();
        }
      }
    }
    return res.status(403).json({ error: 'You can not modify this user' });
  } catch (err) {
    next(err);
  }
};
module.exports = { isModerator, isAdmin, isUser, isInvited, isOwner };
