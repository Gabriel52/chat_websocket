// Import packages
import  express from 'express'
import { Request, Response } from 'express';
import path from 'path'
import { createServer } from "http"
import { Server, Socket } from "socket.io";


import './database'
import { routes } from "./routes";

const app = express()

// Configurando HTML para utilização no projeto...
app.use(express.static(path.join(__dirname, "..", "public")))
app.set("views", path.join(__dirname, "..", "public"))
app.engine("html", require("ejs").renderFile)
app.set("view engine", "html")

app.get("/page", (req:Request , res: Response) => {
    res.render("html/client.html")
})

app.get("/page/admin", (req:Request , res: Response) => {
    res.render("html/admin.html")
})

// Configurando o websocket
const http = createServer(app) // Criando protocolo HTTP...
const io = new Server(http) // Criando protocolo WebSocket...


io.on("connection", (socket: Socket) => { //Fazendo a conexão
    console.log("Se conectou ", socket.id)
    
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(routes)

export { http, io }