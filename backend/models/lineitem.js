'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LineItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // LineItem.belongsTo(models.Order, {
      //   foreignKey: 'OrderName', sourceKey: 'name'
      // })
      LineItem.belongsTo(models.ShoppingCart, {
        foreignKey: 'ShoppingCartId', targetKey: 'id'
      })
      LineItem.belongsTo(models.Product, {
        foreignKey: 'ProductId', targetKey: 'id'
      })
      LineItem.belongsTo(models.Order, {
        foreignKey: 'OrderName', targetKey: 'name'
      })
      
    }
  }
  LineItem.init({
    quantity: DataTypes.INTEGER,
    status: DataTypes.STRING,
    ProductId: DataTypes.INTEGER,
    ShoppingCartId: DataTypes.INTEGER,
    OrderName: DataTypes.STRING,
    ShoppingProductId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'LineItem',
  });
  return LineItem;
};