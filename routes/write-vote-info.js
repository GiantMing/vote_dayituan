'use strict'

const sequelize = require('sequelize');
const Vote      = require('../models/voteModel.js');
const Work      = require('../models/workModel.js');
const fs        = require('fs');


function writeVoteInfo(cb)  {

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

        let works = workModels.map((workModel) => workModel.get()); // 获取作品内容信息

        // 获取投票数量
        let promises = works.map((work) => {
            return Vote.findAll({
                attributes: ['work_id', [sequelize.fn('COUNT', sequelize.col('id')), 'vote_num']],
                where: {
                    work_id: work.id
                }
            })
        });

        Promise.all(promises).then((votes) => {
            return votes.map((vote) => vote[0]);
        })
        .then((votes) => {
            votes.forEach((item, index) => works[index].vote_num = item.get('vote_num'));
            return works;
        })
        .then((works) => {
            // fs.writeFile('./routes/data.json', JSON.stringify({
            //     song_works: works.filter((work) => work.type === 'song'), 
            //     preside_works: works.filter((work) => work.type === 'preside')
            // }), 'utf-8');
            return {
                song_works: works.filter((work) => work.type === 'song'), 
                preside_works: works.filter((work) => work.type === 'preside')
            }
        }).then(cb);
    })
}

module.exports = writeVoteInfo;