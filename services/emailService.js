// services/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // ou outro provedor
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function enviarEmail(destinatario, assunto, corpoHtml) {
  const mailOptions = {
    from: `"Oficeld Style For Life" <${process.env.EMAIL_USER}>`,
    to: destinatario,
    subject: assunto,
    html: corpoHtml
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📨 E-mail enviado para ${destinatario}`);
  } catch (error) {
    console.error('❌ Erro ao enviar e-mail:', error);
    throw error;
  }
}

module.exports = { enviarEmail };
