var jwt = require('jsonwebtoken');
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
  autorisation: function(authorization) {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
  },
  userid: function(authorization) {
    let userId = "";
    let token = module.exports.autorisation(authorization);
    if(token != null) {
      try {
        let tokenVerif = jwt.verify(token, JWT);
        if(tokenVerif != null)
          userId = tokenVerif.userId;
      } catch(err) { }
    }
    return userId;
  }
}