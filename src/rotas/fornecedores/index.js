const app = require('express').Router();

const Fornecedor = require('./Fornecedor');
const table = require('./table');

app.get('/', async (req, res) => {
  const result = await table.listar();
  res.json(result);
})

app.post('/', async (req, res) => {
  const fornecedorInfos = req.body;
  const fornecedor = new Fornecedor(fornecedorInfos);
  await fornecedor.criar();
  res.json({ "msg": "OK" })
})

app.get('/:idFornecedor', async (req, res) => {
  try {
    const id = req.params.idFornecedor;
    const fornecedor = new Fornecedor({ id });
    await fornecedor.carregar();
    res.send(fornecedor);
  } catch (error) {
    res.status(500).json({ "error": error.message });
  }
})

app.put('/:idFornecedor', async (req, res) => {
  try {
    const id = req.params.idFornecedor;
    const dadosRecebidos = req.body;
    const dados = Object.assign({}, dadosRecebidos, { id });
    const fornecedor = new Fornecedor(dados);
    await fornecedor.atualizar();
    res.end();
  } catch (error) {
    res.status(500).json({ "error": error.message });
  }
})

module.exports = app