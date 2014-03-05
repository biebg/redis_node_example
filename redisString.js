/**
 * Created by a11 on 14-3-5.
 */
var redis = require('redis');
//打开数据库，简历连接
var client = redis.createClient('6379', '127.0.0.1');
client.on("error", function (error) { //监控连接错误
    console.log(error);
});
//redis set操作
client.select('0', function (error) {
    if (error) {
        console.log(error);
    } else {
        // set
        client.set('str_key_0', '0', function (error, res) { //设置key为str_key_0的value为0
            //插入成功返回OK结果
            if (error) {
                console.log("set操作完成===>","error:",error,"res:",res)
            } else {
                console.log("set操作完成===>","error:",error,"res:",res)
                client.get('str_key_0', function (error, result) {
                        //在这里调用get的用法做校验，查看是否插入成功
                        if (error) {
                            console.log(error)
                        } else {
                            console.log("get操作完成===>","error:",error,"res:",res)
                        }
                        // 关闭链接
                        client.end();//关闭数据库连接，下同，不再解释
                    }
                )
            }
        });
    }
});
//
