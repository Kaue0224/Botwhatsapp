const express = require('express');
const bodyParser = require('body-parser');
const { handleCommand } = require('./main.js');  // Importa a função que lida com os comandos
const {informacoesSobreoBot} = require('../IdAndPhone/information_phone.js');

const app = express();
const port = 3000;

// Configuração para receber dados em formato JSON
app.use(bodyParser.json());

app.get('/webhook', (req, res) => {
  const verifyToken = informacoesSobreoBot.verifyToken; // Escolha um token secreto e use no Meta

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === verifyToken) {
      console.log("WEBHOOK_VERIFICADO");
      res.status(200).send(challenge); // Validação bem-sucedida
    } else {
      res.sendStatus(403); // Token inválido
    }
  }
});

// Webhook para receber mensagens do WhatsApp
app.post('/webhook', (req, res) => {
  const messages = req.body.entry[0].changes[0].value.messages;

  if (messages && messages.length > 0) {
    const message = messages[0];
    const from = message.from;  // Número do remetente
    const text = message.text.body;  // Conteúdo da mensagem

    // Passa o número do remetente e o texto da mensagem para a função de comando
    console.log(`Mensagem recebida de ${from}: ${text}`);
    handleCommand(from, text);
  }
  else {
    console.log("Nenhuma mensagem encontrada no payload.");
  }

  res.sendStatus(200);  // Responde para confirmar o recebimento
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
