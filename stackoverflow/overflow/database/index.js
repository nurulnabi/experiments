/*
* @Author: noor
* @Date:   2017-04-18 12:32:54
* @Last Modified by:   noor
* @Last Modified time: 2017-04-18 13:20:53
*/

var mongodb = require('mongodb');
var mClient = mongodb.MongoClient;
var dbConn  = new mClient();

var db = {};

var makeConnection = function makeConnection(next){
	dbConn.connect("mongodb://localhost:27017/demo", function(err, dbCur){
		db.db = dbCur.collection('demo');
		next(db);
	})
};

module.exports = {
	makeConnection: makeConnection,
	getDb: function(){ return db.db; }
}