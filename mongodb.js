/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-02-27 11:21:44
* @Last Modified by:   noor
* @Last Modified time: 2017-02-27 11:33:30
*/

var mClient = require('mongodb');
var URL = "mongodb://127.0.0.1:27017/students"
var db;
var dataArr=[];
var data = [1,2,3,4,5,6,7,8,9,10]

var promise = Promise.resolve();

var fetchData = function(db){

	for(var i=0; i<10; i++){
		db.collection('students').findOne({"student_id":i},function(err,doc){
			dataArr.push(doc);
		});
	}
	console.log(dataArr);
}



mClient.connect(URL,function handleConn(err,db){
	fetchData(db);
});


