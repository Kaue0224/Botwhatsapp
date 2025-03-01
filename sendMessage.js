const axios = require('axios');
const {informacoesSobreoBot} = require('../IdAndPhone/information_phone');


// Função para enviar uma mensagem usando a API do WhatsApp Cloud
const sendMessage = (to, message) => {
  axios.post(`https://graph.facebook.com/v22.0/${informacoesSobreoBot.phoneNumberId}/messages`, {
    messaging_product: 'whatsapp',
    to: to,
    text: {
      body: message,
    },
  }, {
    headers: {
      Authorization: `Bearer ${informacoesSobreoBot.accessToken}`,
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    console.log('Mensagem enviada com sucesso:', response.data);
  })
  .catch(error => {
    console.error('Erro ao enviar mensagem:', error);
  });
};

// Exporta a função para ser utilizada em outros arquivos
module.exports = { sendMessage };
