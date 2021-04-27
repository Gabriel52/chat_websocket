import { io } from '../http'; 
import { ConnectionService } from '../services/ConnectionService';
import { UserService } from '../services/UserService';
import { MessageService } from '../services/MessageService';

interface IPrams {
    text: string;
    email: string; 
    
}


io.on("connect", (socket)=> { 
    const connectionService = new ConnectionService()
    const userService = new UserService()
    const messageService = new MessageService()

    socket.on("client_first_access", async params => {

        const socket_id = socket.id;
        const { email, text } = params
        let user_id = null;

        const userAlreadyExists = await userService.fyndByEmail(email)   

        // Salvar a conexão com o socket.id, user_id mas antes verificar se o usuário existe
        if(!userAlreadyExists){
            const user = await userService.create(email)
            
            await connectionService.store({
                socket_id, 
                user_id: user.id
            })
            user_id = user.id
        }else{
            
            user_id = userAlreadyExists.id
            const connection = await connectionService.fyndByUserId(userAlreadyExists.id)

            if(!connection){
                await connectionService.store({
                    socket_id,
                    user_id: userAlreadyExists.id
                })
            }else{
                connection.socket_id = socket_id
                await connectionService.store(connection)
            }

           
        }

        await messageService.create({
            text,
            user_id
        })

        const allMessages = await messageService.index(user_id);

        socket.emit("client_list_all_messages", allMessages);
    })

})