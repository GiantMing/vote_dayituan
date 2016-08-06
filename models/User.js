var Sequelize = require('sequelize');
const CONFIG = require('../config/config');

var sequelize = new Sequelize('vote_2016', CONFIG.username, CONFIG.password);

sequelize
    .authenticate()
    .then(function(err) {
    console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
    console.log('Unable to connect to the database:', err);
    });

var Item = sequelize.define('item', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'compositeIndex'
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    college: {
        type: Sequelize.STRING,
        allowNull: false
    }
});



Item.sync({focus: true});
Item.create({
    name: 'hehe',
    url: 'http://202.202.43.125',
    college: 'CS'
});

Item.findAll()
    .then(function (items) {
         return items.map((item) => item.get())
    })
    .then((names) => console.log(names))

