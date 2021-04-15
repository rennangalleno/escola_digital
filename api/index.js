const express = require('express')
const routes = require('./routes')
require('dotenv').config()
const { estrategiasAutenticacao } = require('./autentication');

const app = express()
routes(app)
app.listen(3000, () => console.log('Servidor está rodando'));

module.exports = app