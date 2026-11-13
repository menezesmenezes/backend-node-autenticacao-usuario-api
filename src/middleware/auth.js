const AppError = require('../errors/AppError');
const { validarToken } = require('../services/tokenService');

function autenticar(req, res, next) {
  const cabecalho = req.headers.authorization || '';
  const [tipo, token] = cabecalho.split(' ');

  if (tipo !== 'Bearer' || !token) {
    throw new AppError(401, 'Token ausente');
  }

  try {
    req.usuarioEmail = validarToken(token).sub;
  } catch {
    throw new AppError(401, 'Token inválido ou expirado');
  }
  next();
}

module.exports = autenticar;
