const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blocklist = require('../redis/blocklist-access-token');
const {UsuariosServices} = require('../services');
const usuariosServices = new UsuariosServices();

function verificaUsuario(usuario) {
  if (!usuario) {
    throw new Error('Não existe usuário com esse e-mail!');
  }
}

async function verificaTokenNaBlocklist(token) {
  const tokenNaBlocklist = await blocklist.contemToken(token);
  console.log(tokenNaBlocklist);
  if (tokenNaBlocklist) {
    throw new jwt.JsonWebTokenError('Token inválido por logout!');
  }
}

async function verificaSenha(senha, senhaHash) {
  const senhaValida = await bcrypt.compare(senha, senhaHash);
  if (!senhaValida) {
    throw new Error('E-mail ou senha inválidos!');
  }
}

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'senha',
      session: false,
    },
    async (email, senha, done) => {
      try {
        const usuario = await usuariosServices.buscaPorEmail(email);
        verificaUsuario(usuario);
        await verificaSenha(senha, usuario.senhaHash);
        done(null, usuario);
      } catch (erro) {
        done(erro);
      }
    }
  )
);

passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      await verificaTokenNaBlocklist(token);
      const payload = jwt.verify(token, process.env.CHAVE_JWT);
      const usuario = await usuariosServices.pegaUmRegistro(payload.id);
      done(null, usuario, { token });
    } catch (erro) {
      done(erro);
    }
  })
);