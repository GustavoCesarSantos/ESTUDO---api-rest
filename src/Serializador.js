const jsonToXml = require('jsontoxml');

const ValorNaoSuportado = require("./erros/ValorNaoSuportado");

class Serializador {
  json(dados) {
    return JSON.stringify(dados);
  }

  xml(dados) {
    return jsonToXml({ [this.tag]: dados });
  }

  serializar(dados) {
    dados = this.filtrar(dados);

    if(this.contentType === 'application/json')
      return this.json(dados);

    if(this.contentType === 'application/xml')
      return this.xml(dados);

    throw new ValorNaoSuportado(this.contentType)
  }

  filtrarObjeto(dados) {
    const novoObjeto = {};
    
    this.camposPublicos.forEach(campo => {
      if(dados.hasOwnProperty(campo)) 
        novoObjeto[campo] = dados[campo];
    })
    
    return novoObjeto;
  }

  filtrar(dados) {
    return Array.isArray(dados) ? dados = dados.map(item => this.filtrarObjeto(item)): dados = this.filtrarObjeto(dados);
  }
}

class SerializadorFornecedor extends Serializador {
  constructor(contentType, camposExtras) {
    super();
    this.contentType = contentType;
    this.camposPublicos = [ 'id', 'empresa', 'categoria' ].concat(camposExtras || []);
    this.tag = 'fornecedores';
  }
}

class SerializadorError extends Serializador {
  constructor(contentType, camposExtras) {
    super();
    this.contentType = contentType;
    this.camposPublicos = [ 'id', 'error' ].concat(camposExtras || []);
    this.tag = 'error';
  }
}

module.exports = { Serializador, SerializadorFornecedor, SerializadorError, formatosAceitos: ['application/json', 'application/xml'] }