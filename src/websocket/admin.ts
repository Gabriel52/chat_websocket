import { io } from '../http'; 
import { ConnectionService } from '../services/ConnectionService';
import { MessageService } from '../services/MessageService';


io.on("connect", async (socket)=> { 
    const connectionService = new ConnectionService()
    const messageService = new MessageService()

    const allConnectionWithoutAdmin = await connectionService.findWithoutAdmin()

    io.emit("admin_list_all_users", allConnectionWithoutAdmin);

    socket.on("admin_list_messages_by_user", async (params, callback) => {
        const { user_id } = params;
      
        const allMessages = await messageService.index(user_id);
      
        callback(allMessages)
    })

    socket.on("admin_send_message", async (params) =>{
        const {user_id, text } = params;

        await messageService.create({
            text,
            user_id,
            admin_id: socket.id
        });
        
        const { socket_id } = await connectionService.fyndByUserId(user_id);

        io.to(socket_id).emit("admin_send_to_client")
    })
})