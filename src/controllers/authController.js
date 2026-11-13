const service = require('../services/usuarioService');

async function login(req, res) {
  res.json(await service.login(req.body));
}

module.exports = { login };
