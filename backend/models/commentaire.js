'use strict';
module.exports = (sequelize, DataTypes) => {
  const Commentaire = sequelize.define('Commentaire', {
    commentaire: DataTypes.TEXT,
    username: DataTypes.STRING,
    usersurname: DataTypes.STRING,
    photoURL: DataTypes.STRING,
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
  }, 
  
  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
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
      }
    });
    return Commentaire;
  };