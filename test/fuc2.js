/**
 * Created by yuansc on 14-4-1.
 */
var DataProvider=require('../modules/DataProvider').DataProvider;
var Redis=new DataProvider();
var init=require('./init');
var async=require('async');
function fuc2(){
      init.init2();
    setTimeout(getList,2000)
}
function getList(){
    Redis.hgetall(new RegExp("^.*"+"id:12"+".*$"),function(err,result){
        console.log(err,result)
    })
}
fuc2()