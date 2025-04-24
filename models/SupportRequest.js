const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('./User');

const SupportRequest = db.define('SupportRequest', {
  pedidoId: DataTypes.INTEGER,
  mensagem: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  motivo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fotoUrl: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM('pendente', 'em_analise', 'aprovado', 'recusado'),
    defaultValue: 'pendente'
  }
});

SupportRequest.belongsTo(User);
module.exports = SupportRequest;