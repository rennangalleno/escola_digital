const Services = require("./Services");
const database = require("../models")

class UsuariosServices extends Services {
  constructor() {
    super('Usuarios');
  }

  async buscaPorEmail(email) {
    return database.Usuarios.findOne({
      where: {
        email: email,
      },
    });
  }

}

module.exports = UsuariosServices;
