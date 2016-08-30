'use strict'

const sequelize = require('sequelize');
const M = require('../models/models');


function getVoteInfo(cb)  {
    let works = null;

    // 查询作品的这些字段
    M.Work.findAll({
        attributes: [
            'id', 
            'work_name', 
            'work_link', 
            'pic', 
            'type', 
            'author'
        ]
    })


    // 查询投票数量
    .then((workModels) => {
        works =  workModels.map((workModel) => workModel.get());
        return Promise.all(workModels.map((workModel) => {
            return workModel.getVotes({
                attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'vote_num']]
            })
        }))
    }) 


    // 获取投票数量
    .then((voteModels) => {
        return voteModels.map((voteModel) => {
            return voteModel[0].get('vote_num');
        });
    })

    // 的到的投票数据存 work 里面
    .then((voteNums) => {
        voteNums.forEach((voteNum, index) => {
            works[index].vote_num = voteNum;
        });
        return works;
    })


    // 两种类型进行分类
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