const app = require('express').Router();

const Fornecedor = require('./Fornecedor');
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor;
const table = require('./table');

app.get('/', async (req, res) => {
  const result = await table.listar();
  const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'));
  res.status(200).send(serializador.serializar(result));
})

app.post('/', async (req, res, next) => {
  try {
    const fornecedorInfos = req.body;
    const fornecedor = new Fornecedor(fornecedorInfos);
    await fornecedor.criar();
    const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'));
    res.status(201).send(serializador.serializar(fornecedor));
  } catch (error) {
    next(error);
  }
})

app.get('/:idFornecedor', async (req, res, next) => {
  try {
    const id = req.params.idFornecedor;
    const fornecedor = new Fornecedor({ id });
    await fornecedor.carregar();
    const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'));
    res.status(200).send(serializador.serializar(fornecedor));
  } catch (error) {
    next(error);
  }
})

app.put('/:idFornecedor', async (req, res, next) => {
  try {
    const id = req.params.idFornecedor;
    const dadosRecebidos = req.body;
    const dados = Object.assign({}, dadosRecebidos, { id });
    const fornecedor = new Fornecedor(dados);
    await fornecedor.atualizar();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
})

app.delete('/:idFornecedor', async (req, res, next) => {
  try {
    const id = req.params.idFornecedor;
    const fornecedor = new Fornecedor({ id });
    await fornecedor.carregar();
    await fornecedor.remover();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
})

module.exports = app