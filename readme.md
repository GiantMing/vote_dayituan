## 大一团投票

```shell

PORT=10086 DEBUG=myapp:* npm start

```

+ 投票接口 
```json
//请求: 
url : vote
type: song , preside // 作品类别
work_ids // 作品id 数组

//返回值:
{
    status: 412, // 重复投票
    msg: "repeat works",
},

{
    status: 415, // 缺少字段
    msg: 'field is lacking'
},
{
    status: 200,  // 成功
    msg: 'success'
},
{
    status: 415,   // mei openid
    msg: 'haven\'t openid',   
}, 
{
    status: 403,   // 今天已经投过票了
    msg: 'vote already'
}

```

8月20 日小心翼翼的重构了一遍, 把 promise 的反模式去除了

