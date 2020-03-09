module.exports = {
    mssql : {
        username: '',
        password: '',
        database: '',
        host: '',
        dialect: 'mssql',
        logging: false,
        timezone: "+07:00"
    },
    sqlite: {
        dialect: "sqlite",
        storage: "./database.sqlite",
        logging: false
    },
    mysql: {
        username: 'root',
        password: '',
        database: 'test',
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
        logging: false,
        timezone: "+07:00"
    },


}