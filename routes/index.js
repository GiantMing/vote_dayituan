'use strict';

const express       = require('express');
const getVoteInfo = require('./get_vote_info.js');
const router        = express.Router();

// 微信 api
const WX            = require('./WX.js');


// 获取 code 和 openid
router.get('/', (req, res, next) => {

    let code = req.query.code,
        openid = req.session.openid;
    

    // 如果有 openid 则直接返回页面    
    if(openid) {
        return next();
    }
    if(!code) {
        return WX.getCode(req, res);
    }

    WX.getOpenid(code)
    .then((body) => {
        body = JSON.parse(body);
        req.session.openid = body.data.openid;
        return WX.getTicket(req, res)
    })
    .then((data) => {
        req.JSSDK = data;
        next();
    })
    .catch(e => console.log(e));

});


// 渲染页面
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
