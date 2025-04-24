require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const freteRoutes = require('./routes/freteRoutes');
const suporteRoutes = require('./routes/suporteRoutes');

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/frete', freteRoutes);
app.use('/api/suporte', suporteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  try {
    await db.authenticate();
    console.log('Conectado ao banco de dados com sucesso!');
    await db.sync();
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
  }
});