const { sendMessage } = require('./sendMessage');  // Importa a função de envio de mensagem
const Comandos = require('./commandsbot/AcoesDeCadaUsuario');

const comandos = new Comandos;
const etapas = {};

function limpar(from){

    etapas[from] = 0;

}


const handleCommand = (from, text) => {

    etapas[from] = 0;

    if(etapas[from] === 0){
        
        sendMessage(from,"Seja Bem-vindo\nBOT PARA PEDIDOS\n\n1-Fornecedor\n2-Cliente");
        etapas[from] = 1;

    }
    
    

    if(etapas[from] === 1){


        
        switch(parseInt(text)){

            case 1:
                
                comandos.logarfornecedor(from);
                
                if (comandos.logarfornecedor(from) === true){
                    
                    limpar(from);
                    sendMessage(from,"deu certo o fornecedor");
                        

                }


                break;
            case 2:
                
                comandos.logarcliente(from);
                limpar(from);
        
                break;
        }



    }





};


module.exports = { handleCommand };
