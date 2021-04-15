"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "alunos",
      [
        {
          cpf: "04568712596",
          nome: "João Feller",
          email: "joao@gmail.com",
          dataNascimento: "1995-05-12",
          ativo: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          cpf: "09557719596",
          nome: "Camila Feller",
          email: "camila@gmail.com",
          dataNascimento: "1999-07-05",
          ativo: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          cpf: "99558818896",
          nome: "Karina Feller",
          email: "karina@gmail.com",
          dataNascimento: "1989-08-05",
          ativo: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("alunos", null, {});
  },
};
