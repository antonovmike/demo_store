'use strict';

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {}
  User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Roles',
        key: 'id'
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: "Users",
  });
  User.associate = function(models) {
    User.belongsTo(models.Role, {
      foreignKey: 'roleId',
      as: 'role'
    });
  }
  return User;
};
