const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const db = require('../db'); // Ajuste esse caminho conforme a localização do seu arquivo de conexão com MySQL
const { enviarEmail } = require('../services/emailService'); // Serviço de envio de e-mail

// Login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const [usuarios] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (!usuarios.length) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const usuario = usuarios[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ message: 'Senha inválida' });
    }

    res.json({ message: 'Login bem-sucedido', usuarioId: usuario.id });
  } catch (err) {
    res.status(500).json({ error: 'Erro no login', detalhes: err.message });
  }
});

// Solicitação de recuperação de senha
router.post('/recuperar-senha', async (req, res) => {
  const { email } = req.body;

  try {
    const [usuarios] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (!usuarios.length) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const expiration = new Date(Date.now() + 3600000); // Token expira em 1 hora

    await db.query(
      'UPDATE usuarios SET reset_token = ?, reset_token_expiration = ? WHERE email = ?',
      [token, expiration, email]
    );

    const link = `http://localhost:3000/resetar-senha/${token}`;
    const corpoHtml = `
      <h2>Recuperação de Senha</h2>
      <p>Clique no botão abaixo para redefinir sua senha:</p>
      <a href="${link}" style="padding: 10px 20px; background: #000; color: #fff; text-decoration: none;">Redefinir Senha</a>
      <p>Esse link expira em 1 hora.</p>
    `;

    await enviarEmail(email, 'Recuperação de Senha - Oficeld Style For Life', corpoHtml);

    res.json({ message: 'E-mail enviado com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao enviar e-mail', detalhes: err.message });
  }
});

// Redefinição de senha com token
router.post('/resetar-senha/:token', async (req, res) => {
  const { token } = req.params;
  const { novaSenha } = req.body;

  try {
    const [usuarios] = await db.query(
      'SELECT * FROM usuarios WHERE reset_token = ? AND reset_token_expiration > NOW()',
      [token]
    );

    if (!usuarios.length) {
      return res.status(400).json({ message: 'Token inválido ou expirado' });
    }

    const senhaCriptografada = await bcrypt.hash(novaSenha, 10);

    await db.query(
      'UPDATE usuarios SET senha = ?, reset_token = NULL, reset_token_expiration = NULL WHERE reset_token = ?',
      [senhaCriptografada, token]
    );

    res.json({ message: 'Senha redefinida com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao redefinir senha', detalhes: err.message });
  }
});

module.exports = router;
