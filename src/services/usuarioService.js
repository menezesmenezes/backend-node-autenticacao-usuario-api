const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const AppError = require('../errors/AppError');
const { gerarToken } = require('./tokenService');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function paraResposta(u) {
  return { id: u.id, nome: u.nome, email: u.email };
}

function validarCadastro(dados) {
  const erros = {};
  if (!dados.nome || !String(dados.nome).trim()) erros.nome = 'nome é obrigatório';
  if (!dados.email || !EMAIL_REGEX.test(String(dados.email).trim())) erros.email = 'email inválido';
  if (!dados.senha || String(dados.senha).length < 6) erros.senha = 'senha deve ter no mínimo 6 caracteres';
  if (Object.keys(erros).length) throw new AppError(400, 'Dados inválidos', erros);
}

async function cadastrar(dados = {}) {
  validarCadastro(dados);

  const email = String(dados.email).trim().toLowerCase();
  const nome = String(dados.nome).trim();

  const existe = await pool.query('SELECT 1 FROM usuarios WHERE email = $1', [email]);
  if (existe.rowCount > 0) throw new AppError(409, 'E-mail já cadastrado');

  const senhaHash = await bcrypt.hash(String(dados.senha), 10);

  try {
    // tipo sempre CLIENTE: nunca vem do JSON (evita alguem se cadastrar como ADMIN)
    const r = await pool.query(
      'INSERT INTO usuarios (nome, email, senha, tipo) VALUES ($1, $2, $3, $4) RETURNING id, nome, email',
      [nome, email, senhaHash, 'CLIENTE']
    );
    return paraResposta(r.rows[0]);
  } catch (e) {
    if (e.code === '23505') throw new AppError(409, 'E-mail já cadastrado');
    throw e;
  }
}

async function login(dados = {}) {
  if (!dados.email || !dados.senha) {
    throw new AppError(400, 'Dados inválidos', {
      ...(!dados.email && { email: 'email é obrigatório' }),
      ...(!dados.senha && { senha: 'senha é obrigatória' }),
    });
  }

  const email = String(dados.email).trim().toLowerCase();
  const r = await pool.query('SELECT id, nome, email, senha FROM usuarios WHERE email = $1', [email]);
  const usuario = r.rows[0];

  if (!usuario || !(await bcrypt.compare(String(dados.senha), usuario.senha))) {
    throw new AppError(401, 'E-mail ou senha inválidos');
  }

  return { token: gerarToken(usuario) };
}

async function buscarPorEmail(email) {
  const r = await pool.query('SELECT id, nome, email FROM usuarios WHERE email = $1', [email]);
  if (r.rowCount === 0) throw new AppError(401, 'Usuário não encontrado');
  return paraResposta(r.rows[0]);
}

async function listar() {
  const r = await pool.query('SELECT id, nome, email FROM usuarios ORDER BY id');
  return r.rows.map(paraResposta);
}

module.exports = { cadastrar, login, buscarPorEmail, listar };
