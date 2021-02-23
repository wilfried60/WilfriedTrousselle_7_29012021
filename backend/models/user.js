'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    usersurname: DataTypes.STRING,
    password: DataTypes.STRING,
    photoURL: DataTypes.STRING,
    description: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.User.hasMany(models.Message);
        models.User.hasMany(models.Commentaire);
        models.User.hasMany(models.Like);
      }
    }
  });
  return User;
};