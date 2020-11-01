const express = require('express');
const config = require('config');

const rotas = require('./src/rotas/fornecedores/index');

const app = express();
app.use(express.json());

app.use('/api/fornecedores', rotas);

app.listen(config.get('api.porta'), () => console.log(`API RODANDO NA PORTA ${config.get('api.porta')}`));