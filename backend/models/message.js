'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Message.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }, onDelete:'CASCADE', 
      })
    }
  };
  Message.init({
    title: {
      type: DataTypes.STRING, 
      allowNull: true },
   contenu:  {
     type: DataTypes.TEXT, 
     allowNull: false },
   imageURL:  {
     type: DataTypes.STRING, 
     allowNull: true },
   likes:  {
     type: DataTypes.INTEGER, 
     allowNull: false },
   dislikes:  {
     type: DataTypes.INTEGER, 
     allowNull: false },
  }, {
    sequelize,

    modelName: 'Message',
  });
  return Message;
};