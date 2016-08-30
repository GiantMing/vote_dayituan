'use strict';

const Sequelize = require('sequelize');
const CONFIG = require('../config/config');

const sequelize = new Sequelize(CONFIG.database, CONFIG.username, CONFIG.password, {
    host: CONFIG.host || 'localhost',
    dialect: CONFIG.dialect || 'mysql',
    port: CONFIG.port || 3306
});

// 连接认证
sequelize
.authenticate()
.then(function(err) {
    console.log('Connection has been established successfully.');
})
.catch(function (err) {
    console.log('Unable to connect to the database:', err);
});

module.exports = sequelize