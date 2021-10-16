const { Sequelize } = require('sequelize');
const { mysql_username, mysql_password, mysql_schema, mysql_host } = require('../config/config');

const sequelize = new Sequelize(mysql_schema, mysql_username, mysql_password, {
    host: mysql_host,
    dialect: 'mysql',
    logging: console.log
});

module.exports = sequelize;