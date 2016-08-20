'use strict'

const sequelize = require('sequelize');
const Vote      = require('../models/voteModel.js');
const Work      = require('../models/workModel.js');
const fs        = require('fs');



function getVoteInfo(cb)  {
    let works = null;
    // 查询作品的这些字段
    Work.findAll({
        attributes: [
            'id', 
            'work_name', 
            'work_link', 
            'pic', 
            'type', 
            'author'
        ]
    })
    .then((workModels) => {
        works =  workModels.map((workModel) => workModel.get());
        return Promise.all(works.map((work) => {
            return Vote.findAll({
                attributes: ['work_id', [sequelize.fn('COUNT', sequelize.col('id')), 'vote_num']],
                where: {
                    work_id: work.id
                }
            })
        }))
    })
    .then((voteModels) => {
        return voteModels.map((voteModel) => {
            return voteModel[0].get('vote_num');
        });
    })
    .then((voteNums) => {
        voteNums.forEach((voteNum, index) => {
            works[index].vote_num = voteNum;
        });
        return works;
    })
    .then((works) => {
        return {
            song_works: works.filter((work) => work.type === 'song'), 
            preside_works: works.filter((work) => work.type === 'preside')
        }
    })
    .then(cb)
    .catch(e => console.log(e));
}


module.exports = getVoteInfo;