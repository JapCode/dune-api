const jwt = require('jsonwebtoken');

const generateInvitationToken = async (data) => {
  const { userId, roles } = data;
  const dataForToken = {
    id: userId,
    roles: roles,
  };
  const invitationToken = jwt.sign(dataForToken, process.env.SECRET, {
    expiresIn: '60m',
  });
  return invitationToken;
};
module.exports = generateInvitationToken;
