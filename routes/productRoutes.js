const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Abertas
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Protegidas (simples verificação de token)
router.post('/', verifyToken, createProduct);
router.put('/:id', verifyToken, updateProduct);
router.delete('/:id', verifyToken, deleteProduct);

module.exports = router;