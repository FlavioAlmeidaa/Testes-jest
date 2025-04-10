const { sequelize, Usuario, Pedido } = require('../models');
const usuarioController = require('../controllers/usuarioController');
const pedidoController = require('../controllers/pedidoController');

beforeAll(async () => {
  console.log('\n🔧 Iniciando testes - sincronizando banco...');
  await sequelize.sync({ force: true });
  console.log('✅ Banco sincronizado\n');

  const usuariosExtras = [
    { nome: 'Alice', email: 'alice@mail.com' },
    { nome: 'Bruno', email: 'bruno@mail.com' },
    { nome: 'Carla', email: 'carla@mail.com' },
    { nome: 'Diego', email: 'diego@mail.com' },
    { nome: 'Eduarda', email: 'eduarda@mail.com' },
    { nome: 'Felipe', email: 'felipe@mail.com' },
    { nome: 'Giovana', email: 'giovana@mail.com' },
    { nome: 'Henrique', email: 'henrique@mail.com' },
    { nome: 'Isabela', email: 'isabela@mail.com' },
    { nome: 'José', email: 'jose@mail.com' }
  ];

  for (const u of usuariosExtras) {
    const usuarioCriado = await usuarioController.criarUsuario(u.nome, u.email);
    
    // Criar 1 a 3 pedidos por usuário com valores aleatórios entre 50 e 200
    const pedidosQtd = Math.floor(Math.random() * 3) + 1;
    for (let i = 1; i <= pedidosQtd; i++) {
      await pedidoController.criarPedido(
        usuarioCriado.id,
        `Pedido ${i} de ${u.nome}`,
        Math.floor(Math.random() * 150) + 50
      );
    }
  }

  console.log('✅ 10 usuários adicionais com pedidos inseridos\n');
});

afterAll(async () => {
  console.log('\n🧹 Encerrando testes - fechando conexão com banco...');
  await sequelize.close();
  console.log('✅ Conexão encerrada\n');
});

describe('🧪 Testes de Usuario e Pedido', () => {
  test('01 - criarUsuario', async () => {
    console.log('\n📌 1 Teste: criarUsuario');
    const usuario = await usuarioController.criarUsuario('João', 'joao@mail.com');
    console.log('👤 Usuário criado:', usuario);
    expect(usuario.nome).toBe('João');
    expect(usuario.email).toBe('joao@mail.com');

    const usuarioNoBanco = await Usuario.findByPk(usuario.id);
    console.log('🔍 Usuário no banco:', usuarioNoBanco ? 'Encontrado' : 'Não encontrado');
    expect(usuarioNoBanco).not.toBeNull();
  });

  test('02 - buscarUsuarioPorId', async () => {
    console.log('\n📌 2 Teste: buscarUsuarioPorId');
    const usuario = await usuarioController.criarUsuario('Ana', 'ana@mail.com');
    const encontrado = await usuarioController.buscarUsuarioPorId(usuario.id);
    console.log('🔍 Resultado da busca:', encontrado);
    expect(encontrado.nome).toBe('Ana');

    const inexistente = await usuarioController.buscarUsuarioPorId(9999);
    console.log('🔍 Busca por ID inexistente:', inexistente);
    expect(inexistente).toBeNull();
  });

  test('03 - atualizarNomeUsuario', async () => {
    console.log('\n📌 3 Teste: atualizarNomeUsuario');
    const usuario = await usuarioController.criarUsuario('Carlos', 'carlos@mail.com');
    const atualizado = await usuarioController.atualizarNomeUsuario(usuario.id, 'Carlos Silva');
    console.log('🔁 Nome atualizado:', atualizado);
    expect(atualizado.nome).toBe('Carlos Silva');

    const erro = await usuarioController.atualizarNomeUsuario(9999, 'Teste');
    console.log('⚠️ Atualização em ID inexistente:', erro);
    expect(erro).toBeNull();
  });

  test('04 - deletarUsuario', async () => {
    console.log('\n📌 4 Teste: deletarUsuario');
    const usuario = await usuarioController.criarUsuario('Maria', 'maria@mail.com');
    const id = usuario.id;
    await usuarioController.deletarUsuario(id);
    const apagado = await Usuario.findByPk(id);
    console.log('🗑️ Usuário deletado, encontrado no banco?', apagado !== null);
    expect(apagado).toBeNull();
  });

  test('05 - criarPedido', async () => {
    console.log('\n📌 5 Teste: criarPedido');
    const usuario = await usuarioController.criarUsuario('Pedro', 'pedro@mail.com');
    const pedido = await pedidoController.criarPedido(usuario.id, 'Produto A', 100.0);
    console.log('📦 Pedido criado:', pedido);
    expect(pedido.descricao).toBe('Produto A');
    expect(pedido.usuarioId).toBe(usuario.id);
  });

  test('06 - listarPedidosDoUsuario', async () => {
    console.log('\n📌 6 Teste: listarPedidosDoUsuario');
    const usuario = await usuarioController.criarUsuario('Lucas', 'lucas@mail.com');
    await pedidoController.criarPedido(usuario.id, 'Item 1', 50);
    await pedidoController.criarPedido(usuario.id, 'Item 2', 70);
    const pedidos = await pedidoController.listarPedidosDoUsuario(usuario.id);
    console.log('📄 Pedidos encontrados:', pedidos.length);
    expect(pedidos.length).toBe(2);
  });

  test('07 - calcularTotalPedidos', async () => {
    console.log('\n📌 7 Teste: calcularTotalPedidos');
    const usuario = await usuarioController.criarUsuario('Julia', 'julia@mail.com');
    await pedidoController.criarPedido(usuario.id, 'Item 1', 30);
    await pedidoController.criarPedido(usuario.id, 'Item 2', 20);
    const total = await pedidoController.calcularTotalPedidos(usuario.id);
    console.log('💰 Total calculado:', total);
    expect(total).toBe(50);
  });

  test('08 - contarUsuarios', async () => {
    console.log('\n📌 8 Teste: contarUsuarios');
    const totalAntes = await usuarioController.contarUsuarios();
    await usuarioController.criarUsuario('Novo', 'novo@mail.com');
    const totalDepois = await usuarioController.contarUsuarios();
    console.log(`📊 Total antes: ${totalAntes}, depois: ${totalDepois}`);
    expect(totalDepois).toBe(totalAntes + 1);
  });

  test('09 - usuarioComMaisPedidos', async () => {
    console.log('\n📌 9 Teste: usuarioComMaisPedidos');
    const usuario1 = await usuarioController.criarUsuario('Rico', 'rico@mail.com');
    const usuario2 = await usuarioController.criarUsuario('Pobre', 'pobre@mail.com');
    await pedidoController.criarPedido(usuario1.id, '1', 10);
    await pedidoController.criarPedido(usuario1.id, '2', 10);
    await pedidoController.criarPedido(usuario2.id, '1', 10);
    const top = await usuarioController.usuarioComMaisPedidos();
    console.log('🏆 Usuário com mais pedidos:', top.nome);
    expect(top.nome).toBe('Rico');
  });

  test('10 - usuariosAcimaDe', async () => {
    console.log('\n📌 10 Teste: usuariosAcimaDe');
    const usuario = await usuarioController.criarUsuario('Gastador', 'gasta@mail.com');
    await pedidoController.criarPedido(usuario.id, '1', 300);
    const usuarios = await usuarioController.usuariosAcimaDe(100);
    console.log('💸 Usuários com pedidos acima de R$100:', usuarios.map(u => u.nome));
    expect(usuarios.length).toBeGreaterThan(0);
    expect(usuarios[0].nome).toBe('Gastador');
  });
});
