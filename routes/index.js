var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var Vote = require('../models/voteModel.js');
var Work  =require('../models/workModel.js');

// function getOpenid () {

//     var redirecUrl = '',
//         appid = 'wx81a4a4b77ec98ff4',
//         requestUrl = 'http://hongyan.cqupt.edu.cn/MagicLoop/index.php?s=/addon/Api/Api/webOauth',
//         getCodeUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirecUrl}&response_type=code&scope=snsapi_userinfo&state=no#wechat_redirect';



// }

/* GET home page. */
router.get('/', function(req, res, next) {

    Work.findAll({
        attributes: [
        'id', 
        'work_name', 
        'work_link', 
        'pic', 
        'type', 
        'author']
    })
    .then((workModels) => {
        var works = workModels.map((workModel) => workModel.get());
        res.render('index', {
            title: 'fuck promise',
            song_works: works
        })
    });
});
        // var info = [];
        // infos = workModels.map((work) => work.get());

        // infos.forEach( (info, infoIndex) => {
        //     Vote.findAll({
        //         attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'vote_num']],
        //         where: {
        //             work_id: info.id
        //         }
        //     })
        //     .then((vote_nums) => {
        //         vote_nums.forEach((vote_num, vote_num_index) => {
        //             infos[infoIndex].vote_num = vote_num.get('vote_num');
        //         });
        //         return infos
        //     })
        //     .then((infos) => {
        //         var song_works = infos.filter((info) => info.type === 'song');
        //         var preside_works = infos.filter((info) => info.type === 'preside');
        //         // console.log(song_works);
        //         // console.log(preside_works);
        //         return [song_works, preside_works];
        //     })
        //     .then((arr) =>  {
        //         var song_works = arr[0];
        //         var preside_works = arr[1];
        //         console.log(song_works);
        //         console.log(preside_works);
        //         // res.render('index', {
        //         //     title: "fuck vote",
        //         //     song_works: song_works,
        //         //     preside_works: preside_works
        //         // });
        //         // res.send('hello works.js');
        //     });
        // });

        // workModels.((work) => {

        //     var obj = work.get();
        //     console.log(typeof obj);
        //     // obj.forEach((item) => {
        //     //     console.log(item);
        //     // });

        //     // console.log(work.get('id'));
        // });
        // sequelize.query(`SELECT count(id) 
        //                 FROM vote`)


        // return workModels.map((work) =>{
        //     var info = work.get();
        //     info.vote_num = yield Vote.findAll({
        //         attributes: [
        //             [sequelize.fn('COUNT', sequelize.col('work_id')), 'work_id']
        //         ],
        //         where: {
        //             work_id: info.if
        //         }
        //     });
        //     return info;
        // })
    // .then((works) => {
    //     // console.log(works);
    //     // var song_works = works.filter((item) => item.type === 'song');
    //     // var preside_works = works.filter((item) => item.type === 'preside');
    //     // res.render('index',  { 
    //     //     title: 'Express', 
    //     //     song_works: song_works,
    //     //     preside_works:  preside_works
    //     // });
    // })
    // res.render('index', { title: 'Express' });

module.exports = router;
