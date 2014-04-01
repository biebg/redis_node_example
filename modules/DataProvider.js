/**
 * Created by a11 on 14-3-20.
 */
var Provider = require('./provider').Provider,
    util = require('util');

var DataProvider = function () {
};
util.inherits(DataProvider, Provider);
DataProvider.prototype.set = function (key,value,callback) {
    this.client.set(key,value,function(err,result){
       callback(err,result);
    })
};
DataProvider.prototype.get = function (key,callback) {
    this.client.get(key,function(err,result){
        callback(err,result);
    })
};
DataProvider.prototype.hmset = function (hname,info,callback) {
    this.client.hmset(hname,info,function(err,result){
        callback(err,result);
    })
};
DataProvider.prototype.hgetall = function (hname,callback) {
    this.client.hgetall(hname,function(err,result){
        callback(err,result);
    })
};
DataProvider.prototype.lpush = function (name,value,callback) {
    this.client.lpush(name,value,function(err,result){
        callback(err,result);
    })
};
DataProvider.prototype.lrange = function (name,begin,limit,callback) {
    this.client.lrange(name,begin,limit,function(err,result){
        callback(err,result);
    })
};
DataProvider.prototype.sadd = function (name,value,callback) {
    this.client.sadd(name,value,function(err,result){
        callback(err,result);
    })
};
DataProvider.prototype.smembers = function (name,callback) {
    this.client.smembers(name,function(err,result){
        callback(err,result);
    })
};
exports.DataProvider=DataProvider;