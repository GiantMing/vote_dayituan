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

const getOpenid  = WX.getOpenid;
const getJSSDK   = WX.getJSSDK;
const getCode    = WX.getCode;

let data = {};
if(!fs.existsSync('./routes/data.json')) writeVoteInfo(); 
data = require('./data.json');



router.get('/', (req, res, next) => {
    let code = req.query.code;
    let openid = req.session.openid;
    console.log('******************************************************');
    console.log(openid);
    if(code) {
        if(!openid) {
            getOpenid(code)
            .then((body) => {
                try {
                    body = JSON.parse(body);
                    let openid = body.data.openid;
                    req.session.openid = openid;
                    console.log(openid);
                } catch (e) {
                    console.log(e);
                }
                next();
            })
            .catch((err) => {
                console.log(err);
            })
        } else {
            next();
        }
        
    } else {
        getCode(req, res);
    }
});



router.get('/', (req, res, next) => {
    res.render('index', {
        JSSDK: req.JSSDK,
        song_works: data.song_works,
        preside_works: data.preside_works,
        time: (new Date()).getTime().toString()
    });
});


module.exports = router;
