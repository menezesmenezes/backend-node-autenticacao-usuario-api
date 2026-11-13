require('dotenv').config();
const app = require('./app');

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  console.error('Defina JWT_SECRET no arquivo .env com 32 caracteres ou mais.');
  process.exit(1);
}

const porta = process.env.PORT || 8080;
app.listen(porta, () => console.log(`API rodando em http://localhost:${porta}`));
