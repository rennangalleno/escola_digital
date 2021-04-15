const database = require("../models");

class Services {
  constructor(nomeDoModelo) {
    this.nomeDoModelo = nomeDoModelo;
  }

  async pegaTodosOsRegistros() {
    return database[this.nomeDoModelo].findAll();
  }

  async pegaUmRegistro(id) {
    return database[this.nomeDoModelo].findOne({
      where: {
        id: Number(id),
      },
    });
  }

  async insereRegistro (dados){
    return database[this.nomeDoModelo].create(dados)
  }

  async atualizaRegistro (dados, id){
    return database[this.nomeDoModelo].update(dados, {
        where: {
          id: Number(id),
        },
      })
  }

  async deletaRegistro (id){
    return database[this.nomeDoModelo].destroy({
        where: {
          id: Number(id),
        },
      })
  }
}

module.exports = Services;
