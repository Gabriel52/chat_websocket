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

        const allUsers = await connectionService.findWithoutAdmin()
        io.emit("admin_list_all_users", allUsers)   
        
    })
    socket.on("client_send_to_admin", async (params) => {
        const { text, socket_admin_id } = params
        const socket_id = socket.id
        const { user_id } = await connectionService.findBySocketId(socket_id)
        const message = await messageService.create({
            text,
            user_id
        })
        console.log("passou pelo cliente")
        io.to(socket_admin_id).emit("admin_receive_message", {
            message,
            socket_id,
        })
    })
})