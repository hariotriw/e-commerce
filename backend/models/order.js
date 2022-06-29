'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: 'UserId', targetKey: 'id'
      })
      Order.hasMany(models.LineItem, {
        foreignKey: 'OrderName',
        sourceKey: 'name'
      })
    }
  }
  Order.init({
    name: DataTypes.STRING,
    subtotal: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    tax: DataTypes.INTEGER,
    totaldue: DataTypes.INTEGER,
    totalquantity: DataTypes.INTEGER,
    payment_transaction: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};