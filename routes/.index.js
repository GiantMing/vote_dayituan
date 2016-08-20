'use strict';

const express       = require('express');
const getVoteInfo = require('./get_vote_info.js');

const router        = express.Router();

// 微信 api
const WX            = require('./WX.js');
const getOpenid     = WX.getOpenid;
const getJSSDK      = WX.getJSSDK;
const getCode       = WX.getCode;


let code = '',
    openid = '';

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
    getVoteInfo((voteInfo) => {
        res.render('index', {
            JSSDK: req.JSSDK,
            song_works: voteInfo.song_works,
            preside_works: voteInfo.preside_works,
            time: (new Date()).getTime().toString()
        });
    })
});

module.exports = router;
