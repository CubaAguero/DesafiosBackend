import fs from 'fs'

class ChatContainer {
    constructor(nameFile) {
        this.nameFile = nameFile
    }

    async createChat() {
        try{
            await fs.promises.writeFile(this.nameFile, '')
            console.log('chat creado')
        }
        catch(err){
            console.log('No se pudo crear!', err)
        }
    }

    async getAll() {
        try{    
            let res = await fs.promises.readFile(this.nameFile, 'utf-8')
            if (res == "") return null

            return  JSON.parse(res)
        }
        catch(err){
            console.log('No se pudo lerr!', err)
        }
    }

    async save(msj) {
        try{
            let res = await this.getAll()
            let data = []
            if (res != null){
                data = res
            }
            data.push({ msj })
            await fs.promises.writeFile(this.nameFile, JSON.stringify(data, null, 2))
        }
        catch(err){
            console.log('No se pudo guardar!', err)
        }
    }

}

export default ChatContainer