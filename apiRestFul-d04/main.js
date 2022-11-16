const express = require('express')
const app = express()
const routerProductos = express.Router()

//////////////////////////////////////
const Container = require('./container')
let container1 = new Container("productos.txt")

//container1.createFile()

////////////////////////

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', express.static('public'))
app.use('/api/productos', routerProductos)

////////////////////////////////

routerProductos.get('/', async (req, res) => {
    let data = await container1.getAll()
    res.json(data)
})

routerProductos.get('/:id', async (req, res) => {
    let item = await container1.getById(parseInt(req.params.id))
    res.json(item)
})

/*-------*/

routerProductos.post('/guardar', async (req, res) => {
    if(JSON.stringify(req.body) == "{}" || req.body.title == "" || req.body.price == "" || req.body.thumbnail == "" ) return res.json({Error: 'faltan elementos'})
    let data = await container1.save(req.body.title, req.body.price, req.body.thumbnail)
    res.json(data)
})

routerProductos.put('/:id', async (req, res) => {
    let data = await container1.put(parseInt(req.params.id), req.body)
    res.json(data)
})

routerProductos.delete('/:id', async (req, res) => {
    let data = await container1.deleteById(parseInt(req.params.id))
    res.json(data)
})



////////////////////////////

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Server eschuchando en el puerto ${server.address().port}`)
})
server.on('ERROR!', err => console.log(`Error en server ${err}`))