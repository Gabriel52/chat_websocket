import { getCustomRepository, Repository } from "typeorm"
import { Message } from "../entities/Messages";
import { MessageRepository } from "../repositories/MessageRepository"

interface IMessageCreate{
    admin_id?: string, //para dizer que não é obrigatorio
    text: string,
    user_id: string
}

class MessageService {
    private messageRepository: Repository<Message>;

    constructor(){
        this.messageRepository = getCustomRepository(MessageRepository);
    }

    async create({ admin_id, text, user_id }:IMessageCreate){
        const message = this.messageRepository.create({
            admin_id,
            text,
            user_id
        })

        await this.messageRepository.save(message)

        return message
    }

    async index(user_id){
        const list = this.messageRepository.find({
            where: {user_id},
            relations: ["user"]
        })

        return list
    }
}

export { MessageService }