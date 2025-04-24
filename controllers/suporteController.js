const SupportRequest = require('../models/SupportRequest');

exports.criarSolicitacao = async (req, res) => {
  try {
    const { pedidoId, mensagem, motivo, fotoUrl } = req.body;
    const nova = await SupportRequest.create({
      UserId: req.userId,
      pedidoId,
      mensagem,
      motivo,
      fotoUrl
    });
    res.status(201).json(nova);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.minhasSolicitacoes = async (req, res) => {
  try {
    const lista = await SupportRequest.findAll({ where: { UserId: req.userId } });
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listarTodas = async (req, res) => {
  try {
    const lista = await SupportRequest.findAll();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.atualizarStatus = async (req, res) => {
  try {
    const suporte = await SupportRequest.findByPk(req.params.id);
    if (!suporte) return res.status(404).json({ error: 'Solicitação não encontrada' });

    suporte.status = req.body.status;
    await suporte.save();
    res.json(suporte);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
