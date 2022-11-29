const express = require('express')
const { Server: HttpServer, get } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

/*---------------------------------------*/

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/*------------------------------------*/

const Container = require('../contenedores/container')
const ChatContainer = require('../contenedores/chatContainer')

const contenedor1 = new Container('productos.txt')
const chat1 = new ChatContainer('chat1.txt')

// contenedor1.createFile()
// chat1.createChat()

/*--------------------------------------*/

io.on('connection', async socket => {
    console.log('Nuevo Cliente Conectado')
    let prod = await contenedor1.getAll()
    let chat = await chat1.getAll()

    socket.emit("productos", prod)
    socket.emit("chat", chat)

    socket.on('save', async item => {
        await contenedor1.save(item.title, item.price, item.thumbnail)
        prod = await contenedor1.getAll()
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