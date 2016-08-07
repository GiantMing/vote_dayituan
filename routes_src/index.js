
'use strict';
require('babel-polyfill');
var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var Vote = require('../models/voteModel.js');
var Work  =require('../models/workModel.js');
var co = require('co');


/* GET home page. */
router.get('/', (req, res) => {


    co(function * (){
        let workModels = yield Work.findAll({
            attributes: [
                'id', 
                'work_name', 
                'work_link', 
                'pic', 
                'type', 
                'author'
            ]
        });
        
        let works = workModels.map((workModel) => workModel.get());

        co(function * () {
            works.forEach((work, workIndex) => {
                co(function *() {
                    let vote_nums = yield Vote.findAll({
                        attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'vote_num']],
                        where: {
                            work_id: work.id
                        }
                    });
                    let vote_num = vote_nums.map((vote_num) => vote_num.get('vote_num'))[0];
                    work.vote_num = vote_num
                    return works
                })
                .then((works) => {
                    let song_works = works.filter((work) => work.type === 'song');
                    let preside_works = works.filter((work) => work.type === 'preside');
                    // res.send(JSON.stringify(song_works));
                    // res.redirect('/');
                    res.render('index', {
                        title: 'fuck promise', 
                        song_works: song_works,
                        preside_works: song_works
                    });
                });
            });
        });
    });
    return (err) => console.log(err);
});


module.exports = router;
