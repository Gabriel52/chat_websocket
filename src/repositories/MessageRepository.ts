import { EntityRepository, Repository } from "typeorm";
import { Message } from "../entities/Messages";

@EntityRepository(Message)
class MessageRepository extends Repository<Message>{

}

export { MessageRepository }