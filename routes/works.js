var express = require('express');
var validator = require('validator');
var router = express.Router();
var WorkModel = require('../models/workModel');


var info = require('../config/infos.json');
var collegeNames = info.colleges;// 学院名
var work_types = info.work_types;

// 添加作品
router.post('/', function(req, res, next) {
    var work_name = req.body.work_name,
        work_link = req.body.work_link,
        type      = req.body.type,
        pic       = req.body.pic,
        college   = req.body.college,
        phone     = req.body.phone,
        author    = req.body.author;

    var work_info = {
        work_name : work_name,
        work_link : work_link,
        type      : type,
        pic       : pic,
        college   : college,
        phone     : phone,
        author    : author

    };
    


    var response_info = {};

    // 检查参数是否存在
    if(!(work_name && work_link && type && college && phone && author)) {
        response_info = {
            status: 415, // 缺少字段
            msg: 'field is lacking'
        };
    } else {
        // 参数验证
        if(phone.length === 11 && validator.isURL(work_link) && collegeNames.indexOf(college) !== -1 && work_types.indexOf(type) !== -1) {
            response_info = {
                status: 200,  //成功``
                msg: 'success'
            };
        } else {
            response_info = {
                status: 412, // 无效参数
                msg: "invalid parameter",
            };
        };
    };
    if(response_info.status === 200) {
        WorkModel.create(work_info); // 插入数据库
    };
    res.send(JSON.stringify(response_info));
    res.end();
});

module.exports = router;







