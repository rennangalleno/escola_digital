const { AlunosServices } = require("../services");
const alunosServices = new AlunosServices();

class AlunoController {
  static async listaTodosOsAlunos(req, res) {
    try {
      const alunos = await alunosServices.pegaTodosOsRegistros();
      return res.status(200).json(alunos);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async pegaUmAluno(req, res) {
    try {
      const { id } = req.params; // é a mesma coisa que const id = req.params.id
      const aluno = await alunosServices.pegaUmRegistro(id);
      return res.status(200).json(aluno);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async criaAluno(req, res) {
    try {
      const aluno = req.body;
      const alunoCadastrado = await alunosServices.insereRegistro(aluno);
      return res.status(201).json(alunoCadastrado);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async atualizaAluno(req, res) {
    try {
      const { id } = req.params;
      const aluno = req.body;
      await alunosServices.atualizaRegistro(aluno, id);
      return res.status(200).json({ mensagem: `Aluno atualizado com sucesso` });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async deletaAluno(req, res) {
    try {
      const { id } = req.params;
      await alunosServices.deletaRegistro(id);
      return res.status(200).json({ mensagem: `Aluno excluído com sucesso` });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async desativaAluno(req, res) {
    try {
      const { id } = req.params;
      await alunosServices.inativaAluno(id);
      return res.status(200).json({ mensagem: `Aluno inativado com sucesso` });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = AlunoController;
