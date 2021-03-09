'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
  };
  Like.init({
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
  }, {
    sequelize,

    modelName: 'Like',
  });
  return Like;
};