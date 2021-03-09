 'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Commentaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Commentaire.belongsTo(models.User, 
        { foreignKey: {
          allowNull: false
         
        }, 
        onDelete:'CASCADE',
      }),
        models.Commentaire.belongsTo(models.Message, 
          { foreignKey: {
            allowNull: false,
               
          }, 
          onDelete:'CASCADE',
        })
    }
  };
  Commentaire.init({
    commentaire:{
      type: DataTypes.TEXT, 
      allowNull: false },
    username: {
      type: DataTypes.STRING, 
      allowNull: false },
    usersurname:{
      type: DataTypes.STRING, 
      allowNull: false },
    photoURL: {
      type: DataTypes.STRING, 
      allowNull: true },
      MessageId: {
    type: DataTypes.INTEGER,
    references:{
      model: 'Message',
      key: 'id'
    }
  },
    UserId: {
    type:DataTypes.INTEGER,
    references:{
      model: 'User',
      key: 'id'
    }
    }
  }, {
    sequelize,

    modelName: 'Commentaire',
  });
  return Commentaire;
};