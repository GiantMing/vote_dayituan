var Sequelize = require('sequelize');
var validator = require('validator'); // 验证

var sequelize = require('./connect');

var info = require('../config/infos.json')



var collegeNames = info.colleges;
var work_types = info.work_types;

/**
 * work 表
 * work_name 作品名称
 * work_link 作品链接
 * type      作品种类(唱歌,主持)
 * college   作者所属学院
 * phone     作者电话
 * email     作者 email
 * author    作者名字
 */
var Work = sequelize.define('work', {
    work_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    work_link: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isURL: true,
        }
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
        values: work_types,
    },
    pic: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'not-face.jpg',
    },
    college: {
        type: Sequelize.STRING,
        allowNull: false,
        values: collegeNames
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            isEmail: true,
        }
    },
});

Work.sync();//{focus: true});

module.exports = Work;
