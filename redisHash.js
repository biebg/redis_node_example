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
        // hmset
        var info = {};
        info.baidu = 'www.baidu.com';
        info.sina = 'www.sina.com';
        info.qq = 'www.qq.com';
        client.hmset('site', info, function (error, res) {
            //插入哈希数据，info为json格式
            console.log("hmset成功==","error:",error,"res:",res);
            if (error) {
                console.log(error);
            } else {

                client.hmget('site', ['baidu', 'qq'], function (error, result) {
                    //获取哈希数据中的特定keys中的值，返回值为数组
                    console.log("hmget==","error:",error,"result:",result);
                    client.end()
                })
            }


        });
    }
});
//
//client.select('0', function (error) {
//    if (error) {
//        console.log(error);
//    } else {
//        // hgetall
//        client.hgetall('site', function (error, res) {
//            //获取site值对应的所有数据（表达不好，即获取整个hash值），返回值为json
//            if (error) {
//                console.log(error);
//            } else {
//                console.log(res);
//            }
//            // 关闭链接
//            client.end();
//        });
//    }
//});