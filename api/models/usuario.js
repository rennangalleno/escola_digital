"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      // define association here
    }
  }

  Usuario.init(
    {
       nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          funcaoValidadora: function(dado) {
            if(dado.length < 3) {throw new Error('O campo nome deve ter mais de 3 caracteres')}
          }
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
            msg: 'Email informado está inválido'
          }
        },
      },
      senhaHash: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      sequelize,
      modelName: "Usuarios",
    }
  );
  return Usuario;
};
