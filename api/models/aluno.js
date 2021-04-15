"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Aluno extends Model {
    static associate(models) {
      // define association here
    }
  }
  Aluno.init(
    {
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          funcaoValidadora: function(dado) {
            if(dado.length !== 11) {throw new Error('O campo cpf deve ter 11 caracteres')}
          }
        },
      },
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
      dataNascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isAfter:{
            args:"1900-01-01",
            msg:'Data informada tem que ser maior que 1900-01-01'
          },
          isBefore:{
            args:"2003-01-01", //arrumar uma forma de subtrair data atual com 18 anos
            msg:'Aluno tem que ser maior de 18 anos'
          }
        },
      },
      ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
    },
    {
      sequelize,
      modelName: "Alunos",
    }
  );
  return Aluno;
};
