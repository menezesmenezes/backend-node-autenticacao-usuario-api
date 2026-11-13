const { Router } = require('express');
const autenticar = require('../middleware/auth');
const usuarioController = require('../controllers/usuarioController');
const authController = require('../controllers/authController');

const router = Router();

router.post('/usuarios', usuarioController.cadastrar);
router.get('/usuarios', autenticar, usuarioController.listar);
router.get('/usuarios/me', autenticar, usuarioController.me);
router.post('/auth/login', authController.login);

module.exports = router;
