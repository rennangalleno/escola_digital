const Services = require("./Services");
const database = require("../models")

class AlunosServices extends Services {
  constructor() {
    super('Alunos');
  }

  async inativaAluno(id){
    //const dado = {ativo: false}
    return super.atualizaRegistro({ativo: false}, id)
  }
}

module.exports = AlunosServices;
