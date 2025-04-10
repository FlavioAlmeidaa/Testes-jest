'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      this.hasMany(models.Pedido, {
        foreignKey: 'usuarioId',
        as: 'pedidos'
      });
    }
  }

  Usuario.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
  });

  return Usuario;
};
