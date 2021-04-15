const { UsuariosServices } = require("../services")
const usuariosServices = new UsuariosServices();
const bcrypt = require("bcrypt");
const blocklist = require('../redis/blocklist-access-token')
const tokens = require('../autentication/tokens')

class UsuarioController {

  static async criaUsuario(req, res) {   
    try {
      const usuario = tokens.userHash.cria(req.body); 
      const usuarioCadastrado = await usuariosServices.insereRegistro(usuario);
      return res.status(201).json(usuarioCadastrado);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
   
  static async login(req, res) {
    try {
      const accessToken = tokens.access.cria(req.user.id)
      const refreshToken = await tokens.refresh.cria(req.user.id)
      res.set('Authorization', accessToken)
      res.status(200).json({refreshToken})
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }
  
  static async logout(req, res) {
    try {
      const token = req.token;
      await blocklist.adiciona(token);
      res.status(204).json();
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }
    
  static async listaTodosOsUsuarios(req, res) {
    try {
      const usuarios = await usuariosServices.pegaTodosOsRegistros();
      return res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async deletaUsuario(req, res) {
    try {
      const { id } = req.params;
      await usuariosServices.deletaRegistro(id);
      return res.status(200).json({ mensagem: `Usuário excluído com sucesso` });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = UsuarioController;
