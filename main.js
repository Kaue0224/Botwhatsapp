const { Menssage } = require('./sendMessage');
const Comandos = require('./commandsbot/database');
const Users = require('./commandsbot/selecao');

const sendMessage = new Menssage();
const users = new Users();
const bancoDeDados = new Comandos();

let etapas = {};
let selecao = {};

const handleCommand = async (from, message) => {
    
    if (!message) {
        console.error("Mensagem não definida!");
        return;
    }

    if (!etapas[from]) {
        await sendMessage.sendButtons(from, "Escolha uma das opções");
        etapas[from] = "selecionando";
        return; // Evita continuar a execução
    }

    const buttonId = sendMessage.checkifbutton(message);

    if (etapas[from] == "selecionando" && buttonId === "1") {
        sendMessage.sendMessage(from, "Escolheu fornecedor");
    } else if (etapas[from] == "selecionando" && buttonId === "2") {
        sendMessage.sendMessage(from, "Escolheu cliente");

    }
    
};


module.exports = { handleCommand };
