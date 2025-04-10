module.exports = {
    testEnvironment: 'node',
    reporters: [
        'default',
        [ 'jest-html-reporter', {
          pageTitle: 'Relatório de Testes',
          outputPath: 'tests/relatorios/relatorio-teste.html',
          includeConsoleLog: true,
        }]
      ],
      silent: false,
  };
  