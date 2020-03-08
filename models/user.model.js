const Sequetlize = require('sequelize');
const ConnectDB = require('../configs/connect');

const user = ConnectDB.define(
    'user', {
    username: { type: Sequetlize.STRING, allowNull: false },
    password: { type: Sequetlize.STRING, allowNull: false },
    name: { type: Sequetlize.STRING, allowNull: false },

}

);
(async () => {
    await user.sync({ force: false });
})();

module.exports = user;