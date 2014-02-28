/**
* Created by a11 on 14-2-28.
*/
var redis   = require('redis');
var client  = redis.createClient('6379', '127.0.0.1');
client.on("error", function(error) {
    console.log(error);
});
client.select('0', function(error){
    if(error) {
        console.log(error);
    } else {
        // set
        client.set('str_key_0', '0', function(error, res) {
            if(error) {
                console.log(error);
            } else {
                console.log(res);
                client.get('str_key_0',function(error,result){
                   if(error){
                       console.log(error)
                   }else{
                       console.log(result)
                   }
                    // 关闭链接
                    client.end();
                })

            }

        });
    }
});

client.select('0', function(error){
    if(error) {
        console.log(error);
    } else {
        // hmset
        var info = {};
        info.baidu = 'www.baidu.com';
        info.sina  = 'www.sina.com';
        info.qq    = 'www.qq.com';
        client.hmset('site', info, function(error, res){
            if(error) {
                console.log(error);
            } else {
                console.log(res);
                client.hmget('site',['baidu','qq'],function(error,result){
                    console.log(error,result)
                    client.end()
                })
            }


        });
    }
});

client.select('0', function(error){
    if(error) {
        console.log(error);
    } else {
        // hgetall
        client.hgetall('site', function(error, res){
            if(error) {
                console.log(error);
            } else {
                console.log(res);
            }

            // 关闭链接
            client.end();
        });
    }
});

client.select('0', function(error){
    if(error) {
        console.log(error);
    } else {
        // lpush
        client.lpush('list', 'key_0');
        client.lpush('list', 'key_1');
        client.lpush('list', 'key_2');
        client.lpush('list', 'key_3');
        client.end();
    }
});
client.select('0', function(error){
    if(error) {
        console.log(error);
    } else {
        // lrange
        client.lrange('list', '0', '-1', function(error, res){
            if(error) {
                console.log(error);
            } else {
                console.log(res);
            }

            // 关闭链接
            client.end();
        });
    }
});