'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShoppingCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ShoppingCart.belongsTo(models.User, {
        foreignKey: 'UserId', targetKey: 'id'
      })
      ShoppingCart.hasMany(models.LineItem, {
        foreignKey: 'ShoppingCartId'
      })
      // ShoppingCart.hasMany(models.LineItem, {
      //   foreignKey: 'ShoppingCartId',
      //   sourceKey: 'id'
      // })
    }
  }
  ShoppingCart.init({
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ShoppingCart',
  });
  return ShoppingCart;
};