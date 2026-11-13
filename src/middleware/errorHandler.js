const AppError = require('../errors/AppError');

function naoEncontrado(req, res) {
  res.status(404).json({ mensagem: 'Rota não encontrada' });
}

// eslint-disable-next-line no-unused-vars
function tratarErros(err, req, res, next) {
  if (err instanceof AppError) {
    const corpo = { mensagem: err.message };
    if (err.detalhes) corpo.erros = err.detalhes;
    return res.status(err.status).json(corpo);
  }
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ mensagem: 'JSON inválido' });
  }
  console.error(err);
  res.status(500).json({ mensagem: 'Erro interno do servidor' });
}

module.exports = { naoEncontrado, tratarErros };
