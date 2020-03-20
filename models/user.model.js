const Sequelize = require('sequelize');
const ConnectDB = require('../configs/connect');

const user = ConnectDB.define(
    'user', {
    username: { type: Sequelize.STRING, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
    name: { type: Sequelize.STRING, allowNull: false },

}

);
(async () => {
    await user.sync({ force: false });
})();

module.exports = user;