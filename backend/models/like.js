'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
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
        
        models.Like.belongsTo(models.User, 
        { foreignKey: {
          allowNull: false
         
        }, 
        onDelete:'CASCADE',
      }),
        models.Like.belongsTo(models.Message, 
          { foreignKey: {
            allowNull: false,
               
          }, 
          onDelete:'CASCADE',
        })
      }
    }
  });
  return Like;
};