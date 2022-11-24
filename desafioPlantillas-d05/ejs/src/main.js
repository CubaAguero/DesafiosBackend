const express = require('express')
const app = express()
const routerProductos = express.Router()

/*------------------------------*/

const Container = require('../api/container')
const container1 = new Container('productos.txt')
//container1.createFile()

/*-----------------------------------*/

app.use('/productos', routerProductos)
app.use(express.static('public'))

app.set('views', './views')
app.set('view engine', 'ejs')

/*------------------------------------*/
routerProductos.use(express.json())
routerProductos.use(express.urlencoded({ extended: true }))

routerProductos.get('/', async (req, res) => {
    let data = await container1.getAll()
    res.render('main', { data })
})

routerProductos.post('/', async (req, res) => {
    if(JSON.stringify(req.body) == "{}" || req.body.title == "" || req.body.price == "" || req.body.thumbnail == "" ) return res.json({Error: 'faltan elementos'})
    await container1.save(req.body.title, req.body.price, req.body.thumbnail)
    res.redirect('/')
})

/*----------------------------------------*/

const PORT = 8080
const server = app.listen(PORT, ()=> {
    console.log(`Sever escuchando en el puerto ${server.address().port}`)
})
server.on('ERROR!', err => console.log(`ERROR en sever ${err}`))