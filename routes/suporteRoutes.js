const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');
const {
  criarSolicitacao,
  minhasSolicitacoes,
  listarTodas,
  atualizarStatus
} = require('../controllers/suporteController');

router.post('/', verifyToken, criarSolicitacao);
router.get('/', verifyToken, minhasSolicitacoes);
router.get('/all', verifyToken, isAdmin, listarTodas);
router.put('/:id/status', verifyToken, isAdmin, atualizarStatus);

module.exports = router;