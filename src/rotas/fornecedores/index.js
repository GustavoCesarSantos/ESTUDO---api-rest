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

module.exports = app