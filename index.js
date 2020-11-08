const config = require('config');
const express = require('express');

const CampoInvalido = require('./src/erros/CampoInvalido');
const DadosNaoFornecidos = require('./src/erros/DadosNaoFornecidos');
const FormatosACeitos = require('./src/Serializador').formatosAceitos;
const NaoEncontrado = require('./src/erros/NaoEncontrado');
const ValorNaoSuportado = require('./src/erros/ValorNaoSuportado');
const rotas = require('./src/rotas/fornecedores/index');
const { formatosAceitos } = require('./src/Serializador');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  let formatoRequisitado = req.headers['accept'];
  if(formatoRequisitado === '*/*')
    formatoRequisitado = 'application/json';

  if(!formatosAceitos.includes(formatoRequisitado))
    return res.status(406).end();

  res.setHeader('Content-Type', formatoRequisitado);
  next();
})

app.use('/api/fornecedores', rotas);
app.use((error, req, res, next) => {
  let status = 500;

  if(error instanceof NaoEncontrado) 
    status = 404 
  
  if(error instanceof CampoInvalido || error instanceof DadosNaoFornecidos) 
    status = 400;

  if(error instanceof ValorNaoSuportado)
    status = 406;
    
  res.status(status).json({ "error": error.message, "id": error.idError });
})

app.listen(config.get('api.porta'), () => console.log(`API RODANDO NA PORTA ${config.get('api.porta')}`));