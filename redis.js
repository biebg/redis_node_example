/**
 * Created by a11 on 14-2-28.
 */
var redis = require('redis');
//打开数据库，简历连接
var client = redis.createClient('6379', '127.0.0.1');
client.on("error", function (error) { //监控连接错误
    console.log(error);
});
//redis set操作
//client.select('0', function (error) {
//    if (error) {
//        console.log(error);
//    } else {
//        // set
//        client.set('str_key_0', '0', function (error, res) { //设置key为str_key_0的value为0
//            //插入成功返回OK结果
//            if (error) {
//                console.log(error);
//            } else {
//                client.get('str_key_0', function (error, result) {
//                        //在这里调用get的用法做校验，查看是否插入成功
//                        if (error) {
//                            console.log(error)
//                        } else {
//                            console.log(result)
//                        }
//                        // 关闭链接
//                        client.end();//关闭数据库连接，下同，不再解释
//                    }
//                )
//            }
//        });
//    }
//});
//
//client.select('0', function (error) {
//    if (error) {
//        console.log(error);
//    } else {
//        // hmset
//        var info = {};
//        info.baidu = 'www.baidu.com';
//        info.sina = 'www.sina.com';
//        info.qq = 'www.qq.com';
//        client.hmset('site', info, function (error, res) {
//            //插入哈希数据，info为json格式
//            if (error) {
//                console.log(error);
//            } else {
//                console.log(res);
//                client.hmget('site', ['baidu', 'qq'], function (error, result) {
//                    //获取哈希数据中的特定keys中的值，返回值为数组
//                    console.log(error, result)
//                    client.end()
//                })
//            }
//
//
//        });
//    }
//});
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
//
//client.select('0', function (error) {
//    if (error) {
//        console.log(error);
//    } else {
//        // lpush
//        //链表插入，插入多值，存储数据如同栈，最后进入的获取时在最上方
//        client.lpush('list', 'key_0');
//        client.lpush('list', 'key_1');
//        client.lpush('list', 'key_2');
//        client.lpush('list', 'key_3');
//        client.end();
//    }
//});
//client.select('0', function (error) {
//    if (error) {
//        console.log(error);
//    } else {
//        // lrange
//        //获取list链表中所有的数据，-1表示所有，也可为其他值，代表第0个到第X个
//        client.lrange('list', '0', '-1', function (error, res) {
//            if (error) {
//                console.log(error);
//            } else {
//                console.log(res);
//            }
//
//            // 关闭链接
//            client.end();
//        });
//    }
//});
//client.select('0', function (error) {
//    if (error) {
//        console.log(error);
//    } else {
//        // lrange
//
//        client.sadd("bigset", "a member");
//        client.sadd("bigset", "another member");
//        client.end();
//    }
//});
//client.select('0', function (error) {
//    if (error) {
//        console.log(error);
//    } else {
//        client.smembers("bigset", function(error,result){
//            console.log(error,result);
//        });
//    }
//});

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
