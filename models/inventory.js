'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    static associate(models) {
      // define association here
    }
  }

  Inventory.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Inventory',
  });

  return Inventory;
};
