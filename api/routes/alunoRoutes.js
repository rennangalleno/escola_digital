const { Router } = require('express')
const AlunoController = require('../controllers/AlunoController')
const { middlewaresAutenticacao }  = require('../autentication');

const router = Router()

router
    .get('/alunos', middlewaresAutenticacao.bearer, AlunoController.listaTodosOsAlunos)
    .get('/alunos/:id', middlewaresAutenticacao.bearer, AlunoController.pegaUmAluno)
    .post('/alunos', middlewaresAutenticacao.bearer, AlunoController.criaAluno)
    .post('/alunos/:id/inativa', middlewaresAutenticacao.bearer, AlunoController.desativaAluno)
    .put('/alunos/:id', middlewaresAutenticacao.bearer, AlunoController.atualizaAluno)
    .delete('/alunos/:id', middlewaresAutenticacao.bearer, AlunoController.deletaAluno)

module.exports = router