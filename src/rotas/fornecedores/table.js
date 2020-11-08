const model = require('./model');
const NaoEncontrado = require('../../erros/NaoEncontrado');

module.exports = {
  listar() {
    return model.findAll();
  },

  inserir(dados) {
    return model.create(dados);
  },

  async pegarPorId(id) {
    const encontrado = await model.findOne({ where: { id } })
    if(!encontrado)
      throw new NaoEncontrado();

    return encontrado;
  },

  atualizar(id, dados) {
    return model.update(dados, { where: { id } })
  },

  remover(id) {
    return model.destroy({ where: { id } })
  }
}