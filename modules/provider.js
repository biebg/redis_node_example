require('./Config');
var redis=require('redis');
var Provider = function () {
};
Provider.prototype.client =redis.createClient(global.port,global.host)
Provider.prototype.client.on('error',function(err){
    console.log(err);
});
exports.Provider = Provider;