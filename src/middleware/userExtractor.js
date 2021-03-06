const jwt = require('jsonwebtoken');

const userExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  let token = '';
  let decodedToken = '';

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.split(' ')[1];
  }

  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (error) {
    return res.status(401).json({ error: 'token is not valid' });
    //here has error
  }

  if (!token || !decodedToken.id) {
    return res.status(401).json({
      error: 'token missing or invalid',
    });
  }
  const { id: usedId } = decodedToken;
  req.userId = usedId;
  req.userRoles = decodedToken.roles;
  next();
};
module.exports = userExtractor;
