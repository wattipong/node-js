const Sequelize = require('sequelize');
const ConnectDB = require('../configs/connect');

const product = ConnectDB.define(
    'product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "-"
    },
    price: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    stock: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    }
},
    {
        // options
    }


);
(async () => {
    await product.sync({ force: false });
})();

module.exports = product;
