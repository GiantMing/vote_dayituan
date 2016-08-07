
'use strict';

require('babel-polyfill');
var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var Vote = require('../models/voteModel.js');
var Work = require('../models/workModel.js');
var co = require('co');

/* GET home page. */
router.get('/', function (req, res) {

    co(regeneratorRuntime.mark(function _callee3() {
        var workModels, works;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return Work.findAll({
                            attributes: ['id', 'work_name', 'work_link', 'pic', 'type', 'author']
                        });

                    case 2:
                        workModels = _context3.sent;
                        works = workModels.map(function (workModel) {
                            return workModel.get();
                        });


                        co(regeneratorRuntime.mark(function _callee2() {
                            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            works.forEach(function (work, workIndex) {
                                                co(regeneratorRuntime.mark(function _callee() {
                                                    var vote_nums, vote_num;
                                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                                        while (1) {
                                                            switch (_context.prev = _context.next) {
                                                                case 0:
                                                                    _context.next = 2;
                                                                    return Vote.findAll({
                                                                        attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'vote_num']],
                                                                        where: {
                                                                            work_id: work.id
                                                                        }
                                                                    });

                                                                case 2:
                                                                    vote_nums = _context.sent;
                                                                    vote_num = vote_nums.map(function (vote_num) {
                                                                        return vote_num.get('vote_num');
                                                                    })[0];

                                                                    work.vote_num = vote_num;
                                                                    return _context.abrupt('return', works);

                                                                case 6:
                                                                case 'end':
                                                                    return _context.stop();
                                                            }
                                                        }
                                                    }, _callee, this);
                                                })).then(function (works) {
                                                    var song_works = works.filter(function (work) {
                                                        return work.type === 'song';
                                                    });
                                                    var preside_works = works.filter(function (work) {
                                                        return work.type === 'preside';
                                                    });
                                                    // res.send(JSON.stringify(song_works));
                                                    // res.redirect('/');
                                                    res.render('index', {
                                                        title: 'fuck promise',
                                                        song_works: song_works,
                                                        preside_works: song_works
                                                    });
                                                });
                                            });

                                        case 1:
                                        case 'end':
                                            return _context2.stop();
                                    }
                                }
                            }, _callee2, this);
                        }));

                    case 5:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));
    return function (err) {
        return console.log(err);
    };
});

module.exports = router;