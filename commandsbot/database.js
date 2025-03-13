const { sendMessage } = require('../sendMessage');


class Comandos{

    logarfornecedor(text){

        

        

        if(text === 123){

            sendMessage(from,"digite a senha:");
            let etapa = "passou";

            if(text === 123 && etapa[from] === "passou"){

                return true;

            }else{

                return false;
            }

        }
        
        

    }

    logarcliente(from){

        sendMessage(from,"logar o cliente");


    }



}



module.exports = Comandos;