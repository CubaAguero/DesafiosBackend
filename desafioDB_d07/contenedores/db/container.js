import knexLib from 'knex'

class Container {
    constructor(options, table){
        this.knex = knexLib(options),
        this.table = table
    }

    async newTable(){
        try {
            return this.knex.schema.dropTableIfExists(this.table)
                .finally(() => {
                    return this.knex.schema.createTable(this.table, table => {
                        table.increments('id').primary();
                        table.string('title', 50).notNullable();
                        table.float('price');
                        table.string('thumbnail')
                    })
                })
        }
        catch(err){
            console.log("ERROR!", err)
        }
    }

    async save(prod){
        try {
            return this.knex(this.table).insert(prod)
        }
        catch(err){
            console.log("ERROR!",err)
        }
    }

    async getAll(){
        try {
            return this.knex.select().from(this.table)
        }
        catch(err){
            throw new Error(`Error! ${err}`)
        }
    }


}

export default Container