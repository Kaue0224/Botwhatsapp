const express = require('express');
const { handleCommand } = require('./main.js');
const { informacoesSobreoBot } = require('../IdAndPhone/information_phone.js');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/webhook', (req, res) => {
  const verifyToken = informacoesSobreoBot.verifyToken;

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === verifyToken) {
      console.log("WEBHOOK_VERIFICADO");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

app.post('/webhook', async (req, res) => {
  console.log("Payload recebido:", JSON.stringify(req.body, null, 2));

  const messages = req.body.entry?.[0]?.changes?.[0]?.value?.messages;

  if (messages && messages.length > 0) {
    const message = messages[0];
    const from = message.from;
    let text = "";

    if (message.type === "interactive" && message.interactive?.type === "button_reply") {
      text = message.interactive.button_reply.title;  // Pegando o título do botão pressionado
      console.log(`Botão pressionado: ${text}`);
    } 
    else if (message.type === "text" && message.text?.body) {
      text = message.text.body;
      console.log(`Mensagem de texto: ${text}`);
    } 
    else {
      console.log("Tipo de mensagem não suportado:", message.type);
      return res.sendStatus(200);
    }

    await handleCommand(from, message);  // Chama a função de forma assíncrona
  } else {
    console.log("Nenhuma mensagem encontrada no payload.");
  }

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
