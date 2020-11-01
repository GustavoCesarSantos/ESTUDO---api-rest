const modelFornecedores = require('../rotas/fornecedores/model');

modelFornecedores.sync()
  .then(() => console.log('Tabela criada com sucesso.'))
  .catch((err) => console.error(err))