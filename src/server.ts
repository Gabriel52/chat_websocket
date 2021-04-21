// Packages
import express from 'express';
import './database';
import { routes } from './routes';

const app = express();

app.use(express.json())
app.use(routes);


const PORT = 3000 || process.env.PORT
app.listen(PORT, ()=> console.log(`SERVER IS RUNNING ON PORT ${PORT}`));