const model = require('./model');

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
      throw new Error('Fornecedor não encontrado.');

    return encontrado;
  }
}