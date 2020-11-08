const config = require('config');
const express = require('express');

const CampoInvalido = require('./src/erros/CampoInvalido');
const DadosNaoFornecidos = require('./src/erros/DadosNaoFornecidos');
const NaoEncontrado = require('./src/erros/NaoEncontrado');
const rotas = require('./src/rotas/fornecedores/index');

const app = express();
app.use(express.json());

app.use('/api/fornecedores', rotas);
app.use((error, req, res, next) => {
  let status = 500;

  if(error instanceof NaoEncontrado) 
    status = 404 
  
  if(error instanceof CampoInvalido || error instanceof DadosNaoFornecidos) 
    status = 400;
    
  res.status(status).json({ "error": error.message, "id": error.idError });
})

app.listen(config.get('api.porta'), () => console.log(`API RODANDO NA PORTA ${config.get('api.porta')}`));