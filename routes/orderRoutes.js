const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/orderController');

router.post('/', verifyToken, createOrder);
router.get('/', verifyToken, getUserOrders);
router.get('/all', verifyToken, getAllOrders);
router.put('/:id/status', verifyToken, updateOrderStatus);

module.exports = router;