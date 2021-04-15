const bodyParser = require('body-parser')

const alunos = require('./alunoRoutes')
const usuarios = require('./usuarioRoutes')

module.exports = app => {
    app.use(
        bodyParser.json(),
        alunos,
        usuarios
    )
}