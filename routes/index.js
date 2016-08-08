'use strict';
// require('babel-polyfill');
const express       = require('express');
const router        = express.Router();
const fs            = require('fs');
const writeVoteInfo = require('./write-vote-info.js');
// const request       = require('request');
const session = require('express-session')

const request =require('request');
const crypto = require('crypto');
const fetch = require('node-fetch');


const getOpenId = require('get_open_id.js');


let data = {};
if(!fs.existsSync('./routes/data.json')) writeVoteInfo(); 
data = require('./data.json');



router.get('/', (req, res, next) => {
    let openid = req.session.openid;
    if(!openid) {
        getOpenid(req, res)
        .then((openid) => {
            req.session.openid = openid;
        })
    }
});



router.get('/', (req, res, next) => {
    
    res.render('index', {
        song_works: data.song_works,
        preside_works: data.preside_works
    });
});


module.exports = router;
