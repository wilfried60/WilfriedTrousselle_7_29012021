'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    title: DataTypes.STRING,
    contenu: DataTypes.STRING,
    imageURL: DataTypes.STRING, 
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER,
  
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        
        models.Message.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          },
          onDelete:'CASCADE',
        })
       
      }
    }
  });
  return Message;
};