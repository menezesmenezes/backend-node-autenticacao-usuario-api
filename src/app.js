const express = require('express');
const routes = require('./routes');
const { naoEncontrado, tratarErros } = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(routes);
app.use(naoEncontrado);
app.use(tratarErros);

module.exports = app;
