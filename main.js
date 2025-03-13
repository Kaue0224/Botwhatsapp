const { sendMessage,sendButtons } = require('./sendMessage');
const Comandos = require('./commandsbot/database');
const Users = require('./commandsbot/selecao');

const users = new Users;
const bancoDeDados = new Comandos;

let etapas = {};
let selecao = {};


const handleCommand = async (from, text) => {
    
    if (!etapas[from]) {  
       
        await sendButtons(from, "Escolha uma opção:");
        etapas[from] = "aguardando_resposta";
        
    } 
    else if (etapas[from] === "aguardando_resposta") {
        
        etapas[from] = "proximo_passo";
        selecao[from] = text; 
        
    
    }

    if (selecao[from] === "1" && etapas[from] === "proximo_passo"){

        await sendMessage(from,"fornecedor")


    };

};


module.exports = { handleCommand };
