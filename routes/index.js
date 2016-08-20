'use strict';

const express       = require('express');
const fs            = require('fs');
const session       = require('express-session')
const writeVoteInfo = require('./write-vote-info.js');
const WX            = require('./WX.js');

const router        = express.Router();

const getOpenid     = WX.getOpenid;
const getJSSDK      = WX.getJSSDK;
const getCode       = WX.getCode;

router.get('/', (req, res, next) => {
    let code = req.query.code;
    let openid = req.session.openid;

    if(!code) {
        getCode(req, res);
    } else if(!openid) {
        getOpenid(code)
        .then((body) => {
            body = JSON.parse(body);
            let openid = body.data.openid;
            req.session.openid = openid;
            WX.getTicket(req, res)
            .then(data => {
                req.JSSDK = data;
                next();
            })   
        })
        .catch((err) => {
            console.error(err);
        })
    } else {
        next();
    }
});





router.get('/', (req, res, next) => {
    writeVoteInfo((data) => {
        res.render('index', {
            JSSDK: req.JSSDK,
            song_works: data.song_works,
            preside_works: data.preside_works,
            time: (new Date()).getTime().toString()
        });
    })
});

module.exports = router;
