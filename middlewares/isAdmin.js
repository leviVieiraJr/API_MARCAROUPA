const User = require('../models/User');

module.exports = async function (req, res, next) {
  try {
    const user = await User.findByPk(req.userId);
    if (!user || user.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ error: 'Acesso restrito ao administrador' });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: 'Erro na verificação de admin' });
  }
};
