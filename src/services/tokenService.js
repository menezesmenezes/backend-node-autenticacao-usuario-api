const jwt = require('jsonwebtoken');

function gerarToken(usuario) {
  const minutos = Number(process.env.JWT_EXPIRATION_MINUTES || 60);
  return jwt.sign({}, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    issuer: 'api-autenticacao',
    subject: usuario.email,
    expiresIn: minutos * 60,
  });
}

function validarToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET, {
    algorithms: ['HS256'],
    issuer: 'api-autenticacao',
  });
}

module.exports = { gerarToken, validarToken };
