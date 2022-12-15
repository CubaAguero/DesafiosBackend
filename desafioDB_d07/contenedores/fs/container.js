import fs from 'fs'

class Container {
    constructor(name){
        this.name = name
    }

    async createFile() {
        try{
            await fs.promises.writeFile(this.name, '')
            console.log('Archivo Creado!')
        }
        catch(err){
            console.log('Error! No se pudo crear el Archivo!',err)
        }
    }

    async readFile() {
        try{
            return fs.promises.readFile(this.name)
        }
        catch(err){
            console.log('Error!, no se pudo leer el Archivo',err)
        }
    }

    async save(title, price, thumbnail) {
        try{
            const res = await this.readFile()
            let dataFile = []
            if(res != "") {
                dataFile = JSON.parse(res)
            }
            
            let item = {}
            item.title = title,
            item.price = price,
            item.thumbnail = thumbnail
            item.id = dataFile.length + 1
            dataFile.push(item)

            await fs.promises.writeFile(this.name, JSON.stringify(dataFile, null, 2))

            return item.id
        }
        catch(err){
            console.log('Error!, no se pudo guardar el Item!', err)
        }
    }

    async getById(id){
        try {
            const res = await this.readFile()
            if ( res == "") {
                return {error: 'No hay Productos!'}
            }
            let dataFile = JSON.parse(res)
            let itemId = dataFile.find( elm => elm.id === id )
            if(itemId == undefined ) return {Error: 'No se encontro el producto!'}
            return itemId
        }
        catch(err){
            console.log('Error!, no se pudo obtener el item!', err)
        }
    }    

    async getAll(){
        try{
            let res = await this.readFile()
            if (res == "") return null
            let data = JSON.parse(res)
            return data
        }
        catch(err){
            console.log("Error!, no se pudo leer el archvio!",err)
        }
    }

    async deleteById(id){
        try{
            let res = await this.readFile()
            if (res == "") return {error: 'No hay Productos!'}
            let data = JSON.parse(res)
            let item = data.find( elm => elm.id === id)
            if (item == undefined) return {Error: 'No se encontro el producto!'}

            let dataFil = data.filter(elm => elm.id !== item.id)
            await fs.promises.writeFile(this.name, JSON.stringify(dataFil, null, 2))
            return id
        }
        catch(err){
            console.log("Error!, no se pudo eliminar el item!",err)
        }
    }

    async deleteAll(){
        try{
            await fs.promises.writeFile(this.name, "")
        }
        catch(err){
            console.log("Error!, no se pudo eliminar!",err)
        }
    }

    async getProdRandom(){
        try{
            let res = await this.getAll()
            if(res == "") return {error: 'No hay Productos!'}
            let random = Math.floor(Math.random() * res.length)
            return res[random]
        }
        catch(err){
            console.log("Error! No se pudo obtener el item!", err)
        }
    }

    async put(id, item){
        try{
            const res = await this.readFile()
            if(res == ""){
                return {Error: "No hay productos!"}
            }
            
            let data = JSON.parse(res)
            let index = data.findIndex((elem) => elem.id === id)
            if(index === undefined) return {Error: "No se encontro el item"}
            let obj = {}
            obj.title= item.title
            obj.price = item.price
            obj.thumbnail = item.thumbnail
            obj.id = id
            data[index] = obj

            await fs.promises.writeFile(this.name, JSON.stringify(data, null, 2))
            return {message: "item actualizado!"}

        }
        catch(err){
            console.log("Error!",err)
        }
    }
}

export default Container