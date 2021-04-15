const allowlistRefreshToken = require('../redis/allowlist-refresh-token');
const crypto = require('crypto');
const moment = require('moment');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

module.exports = {
  userHash:{
    async cria(usuario){
      const senha = usuario.senha
      const custoHash = 12
      const senhaHash = await bcrypt.hash(senha, custoHash);
      const usuarioComSenha = {
        nome: usuario.nome,
        email: usuario.email,
        senhaHash: senhaHash
      }
      return usuarioComSenha;
    }
  },

  access: {
    cria(id) {
      const payload = { id }
      const accessToken = jwt.sign(payload, process.env.CHAVE_JWT, {expiresIn: "15m"});
      return accessToken;
    },
    verifica(token){

    }
  },
  refresh: {
    async cria(id) {
      const refreshToken = crypto.randomBytes(24).toString('hex');
      const dataExpiracaoRefreshToken = moment().add(5, 'd').unix()
      await allowlistRefreshToken.adiciona(refreshToken, id, dataExpiracaoRefreshToken)
      return refreshToken;
    },
    verifica(token){

    }
  },
};
