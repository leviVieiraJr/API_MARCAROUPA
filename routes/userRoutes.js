const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/profile', verifyToken, (req, res) => {
    res.json({ message: 'Acesso autorizado', userId: req.userId });
  });
  
  module.exports = router;