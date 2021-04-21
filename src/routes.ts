import { Router } from 'express';
import { MessageController } from './controllers/MessagesController';
import { SettingsController } from './controllers/SettingsControllers';
import { UserController } from './controllers/UsersController';


const routes = Router();

const settingsController = new SettingsController()
const userController = new UserController()
const messageController = new MessageController()

routes.post("/settings", settingsController.create )
routes.post("/users", userController.create )
routes.post("/message", messageController.create )
routes.get("/message/:id", messageController.index )

export { routes }  