'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      

    }
  };
  User.init({
    email: { 
      type: DataTypes.STRING,
       allowNull: false },
    username: { 
      type: DataTypes.STRING,
       allowNull: false },
    usersurname: { 
      type: DataTypes.STRING,
       allowNull: false },
    password: { 
      type: DataTypes.STRING,
       allowNull: false },
    photoURL: { 
      type: DataTypes.STRING,
       allowNull: true },
    description: { 
      type: DataTypes.STRING,
       allowNull: true },
    isAdmin:{ 
      type: DataTypes.BOOLEAN,
       allowNull: false },
  }, {
    sequelize,

    modelName: 'User',
  });
  return User;
};