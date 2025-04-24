const express = require('express');
const router = express.Router();
const { calcularFrete } = require('../controllers/freteController');

router.post('/', calcularFrete);

module.exports = router;