const { Pedido } = require('../models');

async function criarPedido(usuarioId, descricao, valor) {
  return await Pedido.create({ usuarioId, descricao, valor });
}

async function listarPedidosDoUsuario(usuarioId) {
  return await Pedido.findAll({ where: { usuarioId } });
}

async function calcularTotalPedidos(usuarioId) {
  const pedidos = await Pedido.findAll({ where: { usuarioId } });
  return pedidos.reduce((soma, pedido) => soma + pedido.valor, 0);
}

module.exports = {
  criarPedido,
  listarPedidosDoUsuario,
  calcularTotalPedidos
};
