/**
 * Created by a11 on 14-3-5.
 */
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
        // lrange

        client.sadd("bigset", "a member");
        client.sadd("bigset", "another member");
         client.sadd("bigset", "a member");
        client.end();
    }
});
client.select('0', function (error) {
    if (error) {
        console.log(error);
    } else {
        client.smembers("bigset", function(error,result){
            console.log(error,result);
        });
    }
});