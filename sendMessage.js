const axios = require('axios');
const { informacoesSobreoBot } = require('../IdAndPhone/information_phone');

// Função para enviar uma mensagem de texto
const sendMessage = async (to, message) => {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v22.0/${informacoesSobreoBot.phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to: to,
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${informacoesSobreoBot.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Mensagem enviada com sucesso:', response.data);
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error.response ? error.response.data : error.message);
  }
};

// Função para enviar botões interativos
const sendButtons = async (to, message) => {
  try {
    const data = {
      messaging_product: 'whatsapp',
      to: to,
      type: 'interactive',
      interactive: {
        type: 'button',
        body: { text: message },
        action: {
          buttons: [
            { type: 'reply', reply: { id: '1', title: '1-Fornecedor' } },
            { type: 'reply', reply: { id: '2', title: '2-Cliente' } }
          ]
        }
      }
    };
    
    const response = await axios.post(
      `https://graph.facebook.com/v22.0/${informacoesSobreoBot.phoneNumberId}/messages`,
      data,
      {
        headers: {
          Authorization: `Bearer ${informacoesSobreoBot.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Botões enviados com sucesso:', response.data);

    // Retorna a resposta da API para capturar o valor pressionado posteriormente
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar botões:', error.response ? error.response.data : error.message);
  }
};
// Exporta as funções para uso externo
module.exports = { sendMessage, sendButtons };
