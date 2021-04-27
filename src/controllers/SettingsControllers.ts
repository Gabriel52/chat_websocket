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

    async fyndByUserName(req: Request, res: Response){
        const { username } = req.params

        const settingsSevice = new SettingsService();

        const settings = settingsSevice.findByUserName(username);

        res.status(200).json({ message: settings })

    }        
   
    async update(req: Request, res: Response){
        const { username } = req.params
        const { chat} = req.body

        const settingsSevice = new SettingsService();

        const settings = settingsSevice.update(username, chat)

        res.status(200).json({ message: settings })

    }        

   
}

export { SettingsController }