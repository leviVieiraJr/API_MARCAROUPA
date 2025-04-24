// controllers/freteController.js
const axios = require('axios');

exports.calcularFrete = async (req, res) => {
  const { cepDestino, peso = 1, comprimento = 20, altura = 5, largura = 15 } = req.body;

  try {
    const response = await axios.post(
      'https://api.melhorenvio.com.br/api/v2/me/shipment/calculate',
      [{
        from: { postal_code: process.env.CEP_ORIGEM || '01001-000' },
        to: { postal_code: cepDestino },
        products: [{
          width: largura,
          height: altura,
          length: comprimento,
          weight: peso
        }],
        services: ['1', '2'], // 1 = Correios PAC, 2 = Correios SEDEX
        options: {
          own_hand: false,
          receipt: false,
          insurance_value: 0
        },
        package: {
          height: altura,
          width: largura,
          length: comprimento,
          weight: peso
        }
      }],
      {
        headers: {
          'Authorization': `Bearer ${process.env.MELHOR_ENVIO_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Erro Melhor Envio:', error.response?.data || error.message);
    res.status(500).json({ error: 'Erro ao calcular frete', detalhes: error.message });
  }
};
