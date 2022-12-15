export const optionsMySql = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'ecommerce'
    }
}

export const optionsSQLite = {
    client: "sqlite3",
    connection: { filename: "./DB/ecommerce.sqlite" },
    useNullAsDefault: true
}