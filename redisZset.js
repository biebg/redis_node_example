var redis = require('redis');
//打开数据库，简历连接
var client = redis.createClient('6379', '127.0.0.1');
client.on("error", function (error) { //监控连接错误
    console.log(error);
});
client.select('0', function (error) {
    if (error) {
        console.log(error);
    } else {

        client.zadd("bigzset",0, "a member");
        client.zadd("bigzset",1,"another member");
        client.end();
    }
});
client.select('0', function (error) {
    if (error) {
        console.log(error);
    } else {
        client.zrange('bigzset',0,-1,'WITHSCORES',function(error,result){
            console.log(error,result);
            client.end();
        })

    }
});
