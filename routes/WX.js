'use strict';

const request = require('request');
const crypto = require('crypto');



function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function hash (type) {
    return (str) => {
        let hashObj = crypto.createHash(type);
        hashObj.update(str);
        return hashObj.digest('hex');
    }
}

const md5 = hash('md5');
const sha1 = hash('sha1');

// 随机数范围
function randomRange(min, max) {
    if(max == null) {
        max = min;
        min = 0;
    }
    return min + Math.floor(Math.random() * (max - min +1));
}

// 随机字符串
function randomString(n) {
    let sStr = 'abcdefghijklmnopqistuvwxyz0123456789ABCDEFGHIGKLMNOPQISTUVWXYZ';
    let rStr = '';
    for (let i = 0; i < n; i++) {
        rStr += sStr[randomRange(61)];
    }
    return rStr;
}



// 生成post参数
function paramsGenerator (openid, code) {
    const str = randomString(16)
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

var port = normalizePort(process.env.PORT || '3000');

let WX = {
    getOpenid: function(code) {
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
        });
    },


    // 获取code
    getCode: function(req, res) {
        const REDIRECT_URI = encodeURIComponent('http://' + req.hostname+ ':' + port +req.originalUrl);
        console.log(REDIRECT_URI);
        const APPID = 'wx81a4a4b77ec98ff4';
        const LOCATION = `http://hongyan.cqupt.edu.cn/GetWeixinCode/get-weixin-code.html?appid=${APPID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_userinfo&state=fuckweixin#wechat_redirect`;
        res.writeHead(307, {'Location': LOCATION});
        res.end();
    },

    // 获取Ticket
    getTicket: function (req, res) {
        const URL = "http://hongyan.cqupt.edu.cn/MagicLoop/index.php?s=/addon/Api/Api/apiJsTicket";
        const data = paramsGenerator();
        return new Promise(function(resolve, reject) {
            request.post(URL, {form: data}, function (err, res, body) {
                if(err) {
                    reject(err);
                } else {
                    data.appid = 'wx81a4a4b77ec98ff4';

                    data.ticket = JSON.parse(body).data;
                    data.signature = sha1(`jsapi_ticket=${data.ticket}&noncestr=${data.string}&timestamp=${data.timestamp}&url=${'http://' + req.hostname + req.originalUrl}`)
                    resolve(data);
                }
            })
        });
    },
    JSSDKSignature: function(req) {
        return new Promise((resolve, reject) => {
            this.getTicket()
            .then(resolve)
            .catch(reject)
        })
        
    }
    // 
}



module.exports = WX;