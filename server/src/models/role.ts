'use strict';

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Role extends Model {}
  Role.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
    tableName: "Roles",
  });
  Role.associate = function(models) {
    Role.hasMany(models.User, {
      foreignKey: 'roleId',
      as: 'users'
    });
  }
  return Role;
};
