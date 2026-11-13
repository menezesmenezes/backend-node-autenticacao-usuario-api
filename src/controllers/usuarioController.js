const service = require('../services/usuarioService');

async function cadastrar(req, res) {
  const usuario = await service.cadastrar(req.body);
  res.status(201).json(usuario);
}

async function listar(req, res) {
  res.json(await service.listar());
}

async function me(req, res) {
  res.json(await service.buscarPorEmail(req.usuarioEmail));
}

module.exports = { cadastrar, listar, me };
