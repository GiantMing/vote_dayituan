'use strict';

const request = require('request');
const crypto = require('crypto');



function hash (type) {
    return (str) => {
        let hashObj = crypto.createHash(type);
        hashObj.update(str);
        return hashObj.digest('hex');
    }
}

const md5 = hash('md5');
const sha1 = hash('sha1');


function randomRange(min, max) {
    if(max == null) {
        max = min;
        min = 0;
    }
    return min + Math.floor(Math.random() * (max - min +1));
}

function randomString() {
    let sStr = 'abcdefghijklmnopqistuvwxyz0123456789ABCDEFGHIGKLMNOPQISTUVWXYZ';
    let rStr = '';
    for (let i = 0; i < 16; i++) {
        rStr += sStr[randomRange(61)];
    }
    return rStr;
}



// 生成post参数
function paramsGenerator (openid, code) {
    const str = randomString()
    const timeStamp = (new Date().getTime()).toString();
    const secret = sha1(sha1(timeStamp) + md5(str) + 'redrock');
    const data = {
        "timestamp": timeStamp,
        "string": str,
        "secret": secret,
        "token": 'gh_68f0a1ffc303',
    };
    if (code) data.code = code;
    if (openid) data.openid = openid;

    return data;
}

function getOpenid(code) {
    const URL = 'http://hongyan.cqupt.edu.cn/MagicLoop/index.php?s=/addon/Api/Api/webOauth'
    let data = paramsGenerator(void(0), code);
    return new Promise(function(resolve, reject) {
        request.post(URL, {form: data}, function(err, res, body) {
            if(err) {
                reject(err);
            } else {
                resolve(body);
            }
        });
        // requestPost(URL, DATA)
        // .then((resInfo) => {
        //     resolve(resInfo);
        // })
        // .catch((err) => {
        //     reject(err);
        // })
    });
}


// function getOpenID(code) {
//     const APPID = 'wx81a4a4b77ec98ff4';
//     const SECRET = '872a908ec98bd92f8db811eba2a83236';
//     const URL = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${APPID}&secret=${SECRET}&code=${code}&grant_type=authorization_code`
//     // const DATA = getData(null, code);
//     // console.log(DATA);
//     return new Promise(function(resolve, reject) {
//         requestPost(URL)
//         .then((resInfo) => {
//             resolve(resInfo);
//         })
//         .catch((err) => {
//             reject(err);
//         })
//     })
// }

// 获取code
function getCode(req, res) {
    const REDIRECT_URI = encodeURIComponent('http://' + req.hostname+req.originalUrl);
    const APPID = 'wx81a4a4b77ec98ff4';
    const LOCATION = `http://hongyan.cqupt.edu.cn/GetWeixinCode/get-weixin-code.html?appid=${APPID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_userinfo&state=fuckweixin#wechat_redirect`;
    res.writeHead(307, {'Location': LOCATION});
    res.end();
}


function getJSSDK(req, res) {
    
}





module.exports = {
    getOpenid: getOpenid,
    getJSSDK: getJSSDK,
    getCode: getCode,
}