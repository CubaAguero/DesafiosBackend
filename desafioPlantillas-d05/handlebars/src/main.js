const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const app = express()
const routerProductos = express.Router()

//-------------------------------------------------
const Container = require('../api/container')
const container1 = new Container('productos.txt')
//container1.createFile()

/*----------------------------------------------------*/

app.use('/productos', routerProductos)
app.use(express.static('public'))

app.engine(
    'hbs',
    hbs.engine({
        extname: '.hbs',
        layoutsDir: 'views/layouts',
        defaultLayout: 'index.hbs'
    })
)

app.set('view engine', 'hbs')
app.set('views', './views')

/*-------------------------------------------------*/

routerProductos.use(express.json())
routerProductos.use( express.urlencoded({ extended: true }))

routerProductos.get('/', async (req, res) => {
    let datos = await container1.getAll()
    res.render("main", { datos })
})

routerProductos.post('/', async (req, res) => {
    if(JSON.stringify(req.body) == "{}" || req.body.title == "" || req.body.price == "" || req.body.thumbnail == "" ) return res.json({Error: 'faltan elementos'})
    await container1.save(req.body.title, req.body.price, req.body.thumbnail)
    res.redirect('/')
})

/*------------------------------------------------*/

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Server escuchando el puerto ${server.address().port}`)
})
server.on('ERROR!', err => console.log(`Error en el servidor ${err}`))