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
        // lpush
        //链表插入，插入多值，存储数据如同栈，最后进入的获取时在最上方
        client.lpush('list', 'key_0');
        client.lpush('list', 'key_1');
        client.rpush('list', 'key_2');
        client.rpush('list', 'key_3');
        client.end();
    }
});
client.select('0', function (error) {
    if (error) {
        console.log(error);
    } else {
        // lrange
        //获取list链表中所有的数据，-1表示所有，也可为其他值，代表第0个到第X个
        client.lrange('list', '0', '-1', function (error, res) {
            if (error) {
                console.log(error);
            } else {
                console.log(res);
            }
            // 关闭链接
            client.end();
        });
    }
});