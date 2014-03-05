redis技术分享
============


前期准备
--------------------
  
  #1、node开发环境

  #2、redis数据库 详情：http://blog.csdn.net/yoyoysc/article/details/20137417

  #3、打开redis数据库

  #4、运行相应的js文件

  如
  ```
  node redisHash.js
  ```

各文件介绍
---------------------
 #redisHash.js  node对Hash数据的操作#

 #redisList.js  node对List数据的操作#

 #redisString.js  node对String数据的操作#

 #redisSet.js  node对Set数据的操作#

 #redisZset.js  node对zset数据的操作#


1、redis的介绍
--------------------
  
```
     redis 是一个高性能的key-value数据库；
     redis 是将数据缓存于内存中，所以操作速度十分迅速，且会定时将数据存于硬盘，避免了
     宕机数据丢失的风险；
     redis具有丰富的数据类型；
     redis 的操作都是原子操作；
     redis 具有不同形式的排序能力；
```
2、redis的安装
----------------------

   #ubuntu下安装：

   ```
       官方下载编译，安装redis-server，请见博客；
   ```

   #mac下安装：

   ```
       官方下载，编译；
       homebrew安装；
       详情请见博客
   ```

  #博客地址：

   ```
        https://app.yinxiang.com/shard/s30/sh/1114c776-3bd1-479a-9c7d-dce4d6c9833e/4afa3accb44ff4c04b64cc36e713ab68
   ```
3、redis的各种数据类型及应用场景
-----------------------

  #string类型：

```
     普通的key/value形式的数据类型如：name yuansc
     常用命令：set get incr decr
```

   #hash类型：

```
   数据形式：hash形式，类似json 如 {name:yuansc,sex:male}
   常用命令：hegt,hset,hgetall
   应用场景：个人信息就算
```

   #list类型：

```
    数据形式：双向链表
    常用命令：lpush,rpush,lpop,rpop,lrang
    应用场景：Redis list应用场景非常多,也是Redis最重要的数据结构之一,比如weibo的关注列表,粉丝列表等
    都可以用Redis的list结构来实现.最好的应用场景应该算消息队列
```
    #set类型：

```
    数据形式：集合
    常用命令：sadd,spop,smembers,sunion
    应用场景：Set对外提供的功能与list类似,当你需要存储一个列表数据,又不希望出现重复数据时,
    set 是一个很好的选择,并且set提供了判断某个成员是否在一个set集合 内的接口,这个也是list
    所不能提供的.
```
   #sorted set类型

```
    数据形式：有序集合，
    常用命令：zadd,zrange,zrem,zcard
    应用场景：Sorted set的使用场景与set类似,区别是set不是自动有序的,而sorted set可以
    通过用户额外提供一个优先级(score)的参数来为成员排序,并且是插入有序的, 即自动排序.
    当你需要一个有序的并且不重复的集合列表,那么可以选择sorted set数据结构.
```


4、node对redis的基本操作
---------------------------

   #准备

```
 node安装
 redis安装
 node-redis模块安装 ：npm install redis
```

   #打开数据库,建立连接

```
var redis = require('redis');
//打开数据库，简历连接
var client = redis.createClient('6379', '127.0.0.1');
client.on("error", function (error) { //监控连接错误
    console.log(error);
});
```
   #string操作

```
//redis set操作
client.select('0', function (error) {
    if (error) {
        console.log(error);
    } else {
        // set
        client.set('str_key_0', '0', function (error, res) { //设置key为str_key_0的value为0
            //插入成功返回OK结果
            if (error) {
                console.log(error);
            } else {
            //redis get操作
                client.get('str_key_0', function (error, result) {
                        //在这里调用get的用法做校验，查看是否插入成功
                        if (error) {
                            console.log(error)
                        } else {
                            console.log(result)
                        }
                        // 关闭链接
                        client.end();//关闭数据库连接，下同，不再解释
                    }
                )
            }
        });
    }
});
```

   #hash操作

```
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
            if (error) {
                console.log(error);
            } else {
                console.log(res);
                client.hmget('site', ['baidu', 'qq'], function (error, result) {
                    //获取哈希数据中的特定keys中的值，返回值为数组
                    console.log(error, result)
                    client.end()
                })
            }
        });
    }
});
```

  #list操作

```
client.select('0', function (error) {
    if (error) {
        console.log(error);
    } else {
        // lpush
        //链表插入，插入多值，存储数据如同栈，最后进入的获取时在最上方
        client.lpush('list', 'key_0');
        client.lpush('list', 'key_1');
        client.lpush('list', 'key_2');
        client.lpush('list', 'key_3');
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
```

  #set操作

```
client.select('0', function (error) {
    if (error) {
        console.log(error);
    } else {
        // lrange
        client.sadd("bigset", "a member");
        client.sadd("bigset", "another member");
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
```

   #sorted set操作

```
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
```