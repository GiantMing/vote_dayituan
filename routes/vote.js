'use strict';


const express = require('express');
const router = express.Router();
const util = require('util');
const Vote = require('../models/voteModel');


// 数组去重
function unique(array){
    var n = [];//临时数组
    for(var i = 0;i < array.length; i++){
        if(n.indexOf(array[i]) == -1) n.push(array[i]);
    }
    return n;
}


// 接收投票
router.post('/', function(req, res, next) {
    var work_ids = req.body.work_ids;
    var openid = req.body.openid;
    var type = req.body.type;

    if(work_ids) work_ids = JSON.parse(work_ids);

    var response_info = {};
    
    if(util.isArray(work_ids) && work_ids.length === 3 && unique(work_ids).length !== 3) {
        response_info = {
            status: 412, // 重复投票
            msg: "repeat works",
        };
        res.send(JSON.stringify(response_info));
    } else if(work_ids.length !== 3) {
        response_info = {
            status: 415, // 缺少字段
            msg: 'field is lacking'
        };
        res.send(JSON.stringify(response_info));
    } else if(work_ids.length === 3) {

        response_info = {
            status: 200,  // 成功
            msg: 'success'
        };

        if(!openid) {
            response_info = {
                status: 415,
                msg: 'haven\'t openid', 
            };
            res.send(JSON.stringify(response_info));
        } else {
            Vote.findOne({
                where: {
                    openid: openid,
                    vote_day: (new Date()).toLocaleDateString()
                }
            })
            .then(function(vote) {
                if(vote) {
                    console.log('*************************************');
                    response_info = {
                        status: 403,
                        msg: 'vote already'
                    };
                } else if(response_info.status === 200) {
                    var vote_datas = [];
                    vote_datas = work_ids.map(function (item, index) {
                        return {
                            work_id: item,
                            openid: openid,
                            vote_day: (new Date()).toLocaleDateString()
                        }
                    });
                    Vote.bulkCreate(vote_datas);
                }
                res.send(JSON.stringify(response_info));
            });
        }
    };
});

module.exports = router;
