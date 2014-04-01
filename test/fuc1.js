/**
 * Created by yuansc on 14-4-1.
 */
var DataProvider=require('../modules/DataProvider').DataProvider;
var Redis=new DataProvider();
var init=require('./init');
var async=require('async');
//function fuc1(){
//     init.init1();
//    setTimeout(getList,2000);
//}
function getList(){
    var begin=Date.now();
    Redis.smembers("id:12",function(err,result){
        console.log(err,result);
        var iterator=function(item,finish){
             Redis.hgetall(item,function(err,result){
                 console.log("List===>",result);
                 finish()
             })
        }
        async.eachSeries(result,iterator,function(err,result){
               console.log("耗时=============》",Date.now()-begin,"ms")
        })
    })
}
getList();