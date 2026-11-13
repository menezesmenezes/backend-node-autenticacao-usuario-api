API de Usuários e Autenticação

API REST feita com **Node.js**, Express e PostgreSQL. Cadastra usuários e faz login com JWT.

 Tecnologias

Node.js, Express, PostgreSQL, JWT, BCrypt

 Como rodar

1. Instale o Node.js 18 ou mais novo
2. `npm install`
3. Copie `.env.example` para `.env` e preencha a senha do banco e o `JWT_SECRET`
4. `npm start`

A API sobe em `http://localhost:8080`.

Rotas

- `POST /usuarios`: cadastra usuário
- `POST /auth/login`: login, retorna o token
- `GET /usuarios/me`: dados do usuário logado (precisa do token)
- `GET /usuarios`: lista usuários (precisa do token)
