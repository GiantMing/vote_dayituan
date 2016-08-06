var Sequelize = require('sequelize');
const CONFIG = require('../config/config');

var sequelize = new Sequelize(CONFIG.database, CONFIG.username, CONFIG.password);

sequelize
    .authenticate()
    .then(function(err) {
    console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
    console.log('Unable to connect to the database:', err);
    });

module.exports = sequelize