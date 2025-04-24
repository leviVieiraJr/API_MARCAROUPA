const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('./User');

const Order = db.define('Order', {
  items: {
    type: DataTypes.JSON,
    allowNull: false
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  enderecoEntrega: {
    type: DataTypes.STRING,
    allowNull: false
  },
  formaPagamento: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pendente', 'pago', 'a_caminho', 'entregue', 'cancelado'),
    defaultValue: 'pendente'
  }
});

Order.belongsTo(User);
module.exports = Order;