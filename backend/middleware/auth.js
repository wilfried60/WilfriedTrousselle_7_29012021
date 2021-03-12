const jwt = require('jsonwebtoken');
const JWT = 'RANDOM_TOKEN_SECRET';

module.exports = {
  USERtoken: function(userData) {
    return jwt.sign({
      userId: userData.id,
    },
    JWT,
    {
      expiresIn: '24h'
    })
  },
}