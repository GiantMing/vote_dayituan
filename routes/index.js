'use strict';
// require('babel-polyfill');
const express       = require('express');
const router        = express.Router();
const sequelize     = require('sequelize');
const Vote          = require('../models/voteModel.js');
const Work          = require('../models/workModel.js');
const fs            = require('fs');
const writeVoteInfo = require('./write-vote-info.js');


let data = {};
if(!fs.existsSync('./routes/data.json')) writeVoteInfo(); 
data = require('./data.json');


router.get('/', (req, res) => {
    res.render('index', data);
});


module.exports = router;
