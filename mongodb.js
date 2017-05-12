/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-02-27 11:21:44
* @Last Modified by:   noor
* @Last Modified time: 2017-05-11 12:46:34
*/

var mClient = require('mongodb');
var ObjectId = mClient.ObjectId;
var URL = "mongodb://127.0.0.1:27002/gold_poker"


mClient.connect(URL,function handleConn(err,db){
	// fetchData(db);
db.collection("currentGifts").findAndModify({ playerId:"590d97e98e0f1c2fbd662261"},[],
    { $pull:{giftedItems:{from:"590d97e98e0f1c2fbd662261"}}},
    {new: true }, function(err, res){
    	console.log(err,res.value, res);
    })
});


