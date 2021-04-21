import { request, Request, Response } from 'express';
import { MessageService } from '../services/MessageService';

class MessageController {
    async create(req: Request, res: Response): Promise<Response>{
        const messageService = new MessageService();
        const { admin_id, text, user_id } = req.body

        const message = await messageService.create({
            admin_id,
            text,
            user_id
        })

        return res.status(201).json({message, success: true })
    }

    async index(req: Request, res: Response): Promise<Response> {
        const messageService = new MessageService();

        const { id } = req.params

        const list = await messageService.index(id);

        return res.status(200).json( {message: list, success: true} )

    }
}

export { MessageController }