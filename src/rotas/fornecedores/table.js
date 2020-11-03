const model = require('./model');

module.exports = {
  listar() {
    return model.findAll();
  },

  inserir(dados) {
    return model.create(dados);
  }
}