var Sequelize = require('sequelize');
var validator = require('validator'); // 验证

var sequelize = require('./connect');
var Work = require('./workModel');



var Vote = sequelize.define('vote', {
    work_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    openid: {
        type: Sequelize.STRING,
        allowNull: false,    
    },
    vote_day: {
        type: Sequelize.STRING(10),
        allowNull: false,
    }
});


Vote.sync();

module.exports = Vote;

// var id = Work.create({
//     work_name: '演员',
//     work_link: 'http://hongyan.cqupt.edu.cn',
//     type: 'song',
//     pic: 'hello.png',
//     college: '通信',
//     phone: 13237725597,
// })
//     .get('id')
//     .then(function(id) {
//         console.log(id);
//     });








