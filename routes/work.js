'use strict';

const express = require('express');
const validator = require('validator');
const router = express.Router();
const WorkModel = require('../models/workModel');

const info = require('../config/infos.json');

let collegeNames = info.colleges;// 学院名
let work_types = info.work_types;


const responseInfo = {
    200: {
        status: 200,
        msg: 'success'
    },
    415: {
        status: 415, // 缺少字段
        msg: 'field is lacking'
    },
    412: {
        status: 412, // 无效参数
        msg: "invalid parameter",
    }
}

// 添加作品
router.post('/', function(req, res, next) {
    let work_name = req.body.work_name,
        work_link = req.body.work_link,
        type      = req.body.type,
        pic       = req.body.pic,
        college   = req.body.college,
        phone     = req.body.phone,
        author    = req.body.author;

    let work_info = {
        work_name : work_name,
        work_link : work_link,
        type      : type,
        pic       : pic,
        college   : college,
        phone     : phone,
        author    : author
    };

    // 检查参数是否存在
    if(!(work_name && work_link && type && college && phone && author)) {
        res.json(responseInfo[415]);
    
    // 参数验证
    } else if(!(phone.length === 11 && validator.isURL(work_link) && collegeNames.indexOf(college) !== -1 && work_types.indexOf(type) !== -1)){
        res.json(responseInfo[412])

    // 成功
    } else {
        WorkModel.create(work_info); // 插入数据库
        res.json(responseInfo[200]);
    }
});

module.exports = router;







