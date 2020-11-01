const app = require('express').Router();
const table = require('./table');

app.get('/', async (req, res) => {
  const result = await table.listar();
  res.json(result);
})

module.exports = app