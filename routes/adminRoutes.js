const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');

router.get('/dashboard', verifyToken, isAdmin, (req, res) => {
  res.json({ message: 'Bem-vindo ao painel administrativo!' });
});

module.exports = router;