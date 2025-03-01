const { sendMessage } = require('../sendMessage');


class Comandos{

    logarfornecedor(from){

           
        
        return true;

    }

    logarcliente(from){

        sendMessage(from,"logar o cliente");


    }



}



module.exports = Comandos;