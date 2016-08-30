'use strict';

const express       = require('express');
const router        = express.Router();
const util          = require('util');
const Vote          = require('../models/voteModel');

// 数组去重
function unique(array){
    let n = [];//临时数组
    for(let i = 0;i < array.length; i++){
        if(n.indexOf(array[i]) == -1) n.push(array[i]);
    }
    return n;
}

// 返回参数信息
const responseInfo = {
    412: {
        status: 412, // 重复投票
        msg: 'repeat works',
    },
    415: {
        status: 415, // 缺少字段
        msg: 'field is lacking'
    },
    200: {
        status: 200, // 成功 
        msg: 'success'
    },
    403: {
        status: 403,
        msg: 'vote already'
    },
    500: {
        status: 500,
        msg: 'server error'
    }
}


let work_ids,
	openid,
    type;

// 获取所需的参数
router.post('/', (req, res, next) => {
    work_ids = req.body['work_ids[]'];
    openid = req.session.openid;
    type = req.body.type;
    
    next();
});

// 检查参数是否正确, 缺少, 投票重复
router.post('/', (req, res, next) => {
    if(util.isArray(work_ids) && unique(work_ids).length !== 3) {
        res.json(responseInfo[412]);
    } else {
        next();
    }
})

// 检查长度
router.post('/', (req, res, next) => {
    if(work_ids.length !== 3) {
        res.json(responseInfo[415]);
    } else {
        next();
    }
});

// 检查是否有 openid
router.post('/', (req, res, next) => {
    if(!openid) {
        res.json({status: 415, msg: 'haven\'t openid'});
    } else {
        next();
    }
})

// 检查是否投过票
router.post('/', (req, res, next) => {
    Vote.findOne({
        where: {
            openid: openid,
            vote_day: (new Date()).toLocaleDateString()
        }
    })
    .then((vote) => {
        if(vote) {
            res.json(responseInfo[403]);
        } else {
            next();
        }
    });
});

// 投票成功
router.post('/', (req, res, next) => {
    let vote_datas = work_ids.map((item, index) => {
        return {
            work_id: item,
            openid: openid,
            vote_day: (new Date()).toLocaleDateString()
        }
    });
    Vote.bulkCreate(vote_datas)
    .then((arg) => {
        res.json(responseInfo[200]);
    })
    .catch((err) => {
        res.json(responseInfo[500]);
    });
});



module.exports = router;
