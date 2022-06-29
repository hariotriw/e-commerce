'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductImage.belongsTo(models.Product, {
        foreignKey: 'ProductId', targetKey: 'id'
      })
    }
  }
  ProductImage.init({
    filename: DataTypes.STRING,
    filesize: DataTypes.STRING,
    filetype: DataTypes.STRING,
    primary: DataTypes.BOOLEAN,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductImage',
  });
  return ProductImage;
};