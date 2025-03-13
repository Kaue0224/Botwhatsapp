const { sendMessage } = require('../sendMessage');


class Users{

    selecionar_usuario(text){

        let type_user;

        switch (parseInt(text)) {
            
            case 1:
                
                type_user = "selecao_fonecedor";

                break;
        
            case 2:
                
                type_user = "selecao_cliente";

                break;
        
            default:
                sendMessage(from,"digite um valor valido");
                break;
        
        }

        return type_user;

    }
    


}

module.exports = Users;