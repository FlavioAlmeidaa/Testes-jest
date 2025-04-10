const { Usuario, Pedido } = require('../models');

async function criarUsuario(nome, email) {
  return await Usuario.create({ nome, email });
}

async function buscarUsuarioPorId(id) {
  return await Usuario.findByPk(id);
}

async function atualizarNomeUsuario(id, novoNome) {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return null;
  usuario.nome = novoNome;
  await usuario.save();
  return usuario;
}

async function deletarUsuario(id) {
  return await Usuario.destroy({ where: { id } });
}

async function contarUsuarios() {
  return await Usuario.count();
}

async function usuarioComMaisPedidos() {
  const usuarios = await Usuario.findAll({
    include: [{ model: Pedido, as: 'pedidos' }]
  });

  let maior = null;
  for (const usuario of usuarios) {
    if (!maior || usuario.pedidos.length > maior.pedidos.length) {
      maior = usuario;
    }
  }

  return maior;
}

async function usuariosAcimaDe(valor) {
  const usuarios = await Usuario.findAll({
    include: [{ model: Pedido, as: 'pedidos' }]
  });

  return usuarios.filter(usuario => {
    const total = usuario.pedidos.reduce((sum, p) => sum + p.valor, 0);
    return total > valor;
  });
}

module.exports = {
  criarUsuario,
  buscarUsuarioPorId,
  atualizarNomeUsuario,
  deletarUsuario,
  contarUsuarios,
  usuarioComMaisPedidos,
  usuariosAcimaDe
};
