const express = require('express')
const app = express()
const routerProductos = express.Router()

/*-----------------------------------*/

const Container = require('../api/container')
const container1 = new Container('productos.txt')
//container1.createFile()

/*---------------------------------------*/

app.use('/productos', routerProductos)
app.use(express.static('public'))

app.set("views", "./views")
app.set("view engine", "pug")

/*-----------------------------------*/

routerProductos.use(express.json())
routerProductos.use(express.urlencoded({ extended: true }))

routerProductos.get('/', async (req, res) => {
    let data = await container1.getAll()
    //console.log(data)
    res.render('main', { data })
})

routerProductos.post('/', async (req, res) => {
    console.log("req", req.body)
    await container1.save(req.body.title, req.body.price, req.body.thumbnail)
    res.redirect('/')
})

/*--------------------------------------*/

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error!', err => console.log(`ERROR! ${err}`))