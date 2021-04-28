
import { getCustomRepository, Repository } from 'typeorm';
import { Connection } from '../entities/Connection';
import { ConnectionRepository } from '../repositories/ConnectionRepository';

interface IConnectionCreate{
    socket_id: string;
    user_id: string;
    admin_id?: string //opcional
    id?: string
}

class ConnectionService {
    private connectionRepository: Repository<Connection>
    
    constructor(){
        this.connectionRepository = getCustomRepository(ConnectionRepository)
    }

    async store({socket_id, user_id, admin_id, id }: IConnectionCreate){
           const connection = this.connectionRepository.create({
                socket_id,
                user_id,
                admin_id,
                id,        
           });

           await this.connectionRepository.save(connection)
           return connection
    }

    async fyndByUserId(user_id: string){
        const connection = await this.connectionRepository.findOne({
            user_id
        })

        return connection;
    }

    async findWithoutAdmin(){
        const connections = await this.connectionRepository.find({
            where: {admin_id: null},
            relations: ["user"]
        })

        return connections
    }

    async findBySocketId(socket_id: string){
        const connection = await this.connectionRepository.findOne({
            socket_id,
        })

        return connection;
    }

    async updateAdminID(user_id: string, admin_id: string){
        await this.connectionRepository.createQueryBuilder().
        update(Connection).set({admin_id}).where("user_id = :user_id", {
            user_id 
        }).execute()
    }
}

export { ConnectionService }