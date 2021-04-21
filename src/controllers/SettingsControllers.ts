import { Request, Response } from 'express';
import { SettingsService } from '../services/SettingsService';



class SettingsController {

    async create(req:Request , res: Response ): Promise<Response>{
        const { chat, username } = req.body
        const settingsSevice = new SettingsService();

        try {
            const settings = await settingsSevice.create({ chat, username })            
            return res.status(201).json({message: `${settings.username} criado com sucesso`, success: true})
        
        }catch(error){
            res.status(400).json({ message: error.message })
        }
    }
}

export { SettingsController }