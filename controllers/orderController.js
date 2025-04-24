const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { items, total, enderecoEntrega, formaPagamento } = req.body;
    const userId = req.userId;

    const order = await Order.create({
      items,
      total,
      enderecoEntrega,
      formaPagamento,
      UserId: userId
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { UserId: req.userId } });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Pedido não encontrado' });

    order.status = status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
