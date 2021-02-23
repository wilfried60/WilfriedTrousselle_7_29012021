'use strict';
module.exports = (sequelize, DataTypes) => {
  const Commentaire = sequelize.define('Commentaire', {
    commentaire: DataTypes.TEXT,
    username: DataTypes.STRING,
    usersurname: DataTypes.STRING,
      MessageId: {
    type: DataTypes.INTEGER,
    references:{
      model: 'Messages',
      key: 'id'
    }
  },
    UserId: {
    type:DataTypes.INTEGER,
    references:{
      model: 'Users',
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