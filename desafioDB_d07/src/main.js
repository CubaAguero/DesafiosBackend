import express from 'express'
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

/*---------------------------------------*/

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/*------------------------------------*/

//import Container from '../contenedores/fs/container'
// import ChatContainer from '../contenedores/fs/chatContainer'

// const contenedor1 = new Container('productos.txt')
// const chat1 = new ChatContainer('chat1.txt')

// // contenedor1.createFile()
// // chat1.createChat()

import { optionsMySql, optionsSQLite }  from '../contenedores/db/options/options' 
import  Container from '../contenedores/db/container'
import Chat from '../contenedores/db/chatContainer'



const container1 = new Container(optionsMySql, 'productos')
//container1.newTable()
const chat1 = new Chat(optionsSQLite, 'chat')
//chat1.createTable()

/*--------------------------------------*/

io.on('connection', async socket => {
    console.log('Nuevo Cliente Conectado')
    let prod = await container1.getAll()
    let chat = await chat1.getAll()

    socket.emit("productos", prod)
    socket.emit("chat", chat)

    socket.on('save', async item => {
        console.log('item', item)
        await container1.save(item)
        prod = await container1.getAll()
        io.sockets.emit("productos", prod)
    })

    socket.on('newMessage', async msj => {
        msj.fyh = new Date().toDateString()
        await chat1.save(msj)
        chat = await chat1.getAll()
        io.sockets.emit('chat', chat)
    })
})


/*--------------------------------------*/

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor Http websocket en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('ERROR', err => console.log(`Error en servidor ${err}`))