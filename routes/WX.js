'use strict';

const request = require('request');
const crypto = require('crypto');




function hash (str, type) {
    let hashObj = crypto.createHash(type);
    hashObj.update(str);
    return hashObj.digest('hex');
}

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

function getData (openid, code) {
  const token = 'gh_68f0a1ffc303';
  const timeStamp = Math.floor(new Date().getTime()).toString();
  const str = randomString();
  const secret = hash(hash(timeStamp, 'sha1') + hash(str, 'md5') + 'redrock', 'sha1');
  const data = {
      "timestamp": timeStamp,
      "string": str,
      "secret": secret,
      "token": token,
  };
  if (code) {
    data.code = code;
  } else if (openid) {
    data.openid = openid;
  }
  return data;
}


function requestPost (url,data) {
  return new Promise(function (resolve, reject) {
    request.post(url, {form: data}, function (err, res, body) {
      if (err) {
        reject(err);
      } else {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(e)
        }
      }
    })
  });
}

function getOpenID(req, res) {
  


    return new Promise(function (resolve, reject) {

        let redirect_uri = req.protocol +  ':' + '//' + req.hostname + req.url
        redirect_uri = encodeURIComponent(redirect_uri).toLowerCase();
        console.log(redirect_uri);
        const APPID = 'wx81a4a4b77ec98ff4';
        const URL = 'http://hongyan.cqupt.edu.cn/MagicLoop/index.php?s=/addon/Api/Api/webOauth';
        const LOCATION = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=sfasdfasdfefvee#wechat_redirect`;
        
        console.log(`req.query: \n ${req.query}`);
        let code = req.query.code;

        if(code) {
          const DATA = getData(null, code);
          try {
              requestPost(url, DATA)
              .then((res_info) => {
                  let openid = res_info.data.openid;
                  resolve(openid);
              })
          } catch(e) {
            reject(e);      
          }
        } else {
          res.writeHead(307, {'Location': LOCATION});
          res.end();
        }
    })
}


function getJSSDK(req, res) {
    return new Promise(function(resolve, reject) {
        const URL = 'http://hongyan.cqupt.edu.cn/MagicLoop/index.php?s=/addon/Api/Api/apiJsTicket';
        const DATA = getData();

        let RES_INF;

    });
}





module.exports = {
    getOpenID: getOpenID,
    getJSSDK: getJSSDK
}