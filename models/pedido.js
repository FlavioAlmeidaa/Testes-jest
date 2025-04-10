'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    static associate(models) {
      this.belongsTo(models.Usuario, {
        foreignKey: 'usuarioId',
        as: 'usuario'
      });
    }
  }

  Pedido.init({
    descricao: DataTypes.STRING,
    valor: DataTypes.FLOAT,
    usuarioId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pedido',
  });

  return Pedido;
};
