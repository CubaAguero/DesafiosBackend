import knexLib from 'knex'

class Chat {
    constructor(options, table){
        this.knex = knexLib(options)
        this.table = table
    }

    async createTable(){
        try{
            return  this.knex.schema.dropTableIfExists(this.table)
                .finally(() => {
                    return this.knex.schema.createTable(this.table, table => {
                        table.string("name", 50).notNullable();
                        table.string("fyh");
                        table.string("text");
                    })
                })
        }
        catch(err){
            throw new Error(`ERROR! ${err}`)
        }
    }

    async getAll(){
        try{
            return this.knex.select().from(this.table)
        }  
        catch(err){
            throw new Error(`ERROR! ${err}`)
        }
    }

    async save( message ){
        try{
            return this.knex(this.table).insert( message)
        }
        catch(err){
            console.log('No se pudo guardar!', err)
        }
    }
}

export default Chat