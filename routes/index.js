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


const WX = require('./WX.js');

const getOpenID  = WX.getOpenID;
const getJSSDK   = WX.getJSSDK;


let data = {};
if(!fs.existsSync('./routes/data.json')) writeVoteInfo(); 
data = require('./data.json');



router.get('/', (req, res, next) => {
    let openid = req.session.openid;
    if(!openid) {
        getOpenID(req, res)
        .then((openid) => {
            return req.session.openid = openid;
        })
        .then((openid) => {
            getJSSDK(req, res)
            .then((JSSDK) => {
                req.JSSDK = JSSDK;
                next();
            });
        });
    }
});



router.get('/', (req, res, next) => {
    res.render('index', {
        JSSDK: req.JSSDK,
        song_works: data.song_works,
        preside_works: data.preside_works
    });
});


module.exports = router;
