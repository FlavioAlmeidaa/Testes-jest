# 🧪 Projeto de Testes com Node.js, Sequelize e Jest

Este projeto demonstra a criação e execução de testes automatizados para entidades de **Usuários** e **Pedidos**, utilizando **Sequelize** para persistência em banco de dados e **Jest** para os testes.

---

## 🚀 Tecnologias

- Node.js
- Sequelize (ORM)
- MySQL 
- Jest (testes)
- jest-html-reporter (relatório em HTML)



## 📦 Instalação

```bash
npm install
```

- Configure seu banco de dados em **config/config.json**

- rode o seguinte comando para criar as tabelas:

```bash
npx sequelize-cli db:migrate:status --env test
```



## ▶️ Executando os Testes


- Para executar os testes, utilize:
```bash
npm test
```
- O relatório HTML será salvo em **tests/relatorios/relatorio-teste.html.**




## 📁 Estrutura


- models/ - Modelos Sequelize

- controllers/ - Lógica de negócio

- tests/ - Arquivos de teste

- jest.config.js - Configuração do Jest

- README.md - Este arquivo


 ## ✅ Funcionalidades testadas


- Criar, buscar, atualizar e deletar usuários

- Criar e listar pedidos

- Calcular total de pedidos por usuário

- Relatórios como:

- Usuários com mais pedidos

- Usuários que gastaram acima de determinado valor


## 📄 Licença
Projeto de estudo, desenvolvido para fins acadêmicos.