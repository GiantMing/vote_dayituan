'use strict';

const Sequelize = require('sequelize');
const validator = require('validator'); // 验证

const sequelize = require('./connect');
const Work = require('./workModel');


const Vote = sequelize.define('vote', {
    openid: {
        type: Sequelize.STRING,
        allowNull: false,    
    },
    vote_day: {
        type: Sequelize.STRING(10),
        allowNull: false,
    }
}, {
    underscored: true 
});


module.exports = Vote;