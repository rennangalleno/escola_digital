const { Router } = require('express')
const UsuarioController = require('../controllers/UsuarioController')
const { middlewaresAutenticacao }  = require('../autentication');

const router = Router()

router
    .get('/usuarios', UsuarioController.listaTodosOsUsuarios)
    .post('/usuarios/login', middlewaresAutenticacao.local, UsuarioController.login)
    .post('/usuarios/atualizaToken', middlewaresAutenticacao.refresh, UsuarioController.login)
    .post('/usuarios/logout', [middlewaresAutenticacao.refresh, middlewaresAutenticacao.bearer], UsuarioController.logout)
    .post('/usuarios', middlewaresAutenticacao.bearer, UsuarioController.criaUsuario)
    .delete('/usuarios/:id', middlewaresAutenticacao.bearer, UsuarioController.deletaUsuario)

module.exports = router