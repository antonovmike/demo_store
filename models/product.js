'use strict';

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Product extends Model {}
  Product.init({
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    description: { type: DataTypes.TEXT },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};