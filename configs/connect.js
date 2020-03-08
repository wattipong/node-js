const Sequelize = require('sequelize');
const ConfigDB = require('./db');

const ConnectMySql = new Sequelize(ConfigDB.mysql);
ConnectMySql.authenticate().then(() => {
    console.log('Connectting MySQL Successfully');

}).catch(err => {
    console.log('Error : MySQL Connection Error', err);
});

module.exports = ConnectMySql;