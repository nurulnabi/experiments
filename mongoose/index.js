/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-03-23 16:20:42
* @Last Modified by:   noor
* @Last Modified time: 2017-05-05 10:30:23
*/

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// var readySchema = require('./mongoose');
// var Person = mongoose.model("Person");
// var Story = mongoose.model("Story");
// var users = require('./user');
// mongoose.connect("mongodb://localhost/demo");
// var Schema = mongoose.Schema;
// var Demo = mongoose.model("Demo", new Schema({}), "demos");

// Demo.findOne({}, function(err, docs){
// 	var doc = JSON.parse(JSON.stringify(docs))
// 	console.log(doc.rup);
// })

// // Story
// // 	.findOne({title: "Once Upon a Time"})
// // 	.populate('_creator', 'name')
// // 	.exec(function(err, story){
// // 		console.log(`Error: ${err}, story:${story}`);
// // 	})
// 

// mongoose.connect('mongodb://localhost/crunchbase');

// var connection = mongoose.connection;

// connection.on('error', console.error.bind(console, 'connection error:'));
// connection.once('open', function () {

//     connection.db.collection("companies", function(err, collection){
// 		    collection.aggregate([
// 		{$unwind:"$offices"},
// 		{$match:{"offices.state_code":"CA"}},
// 		{$project:{"offices":1, _id:0}}
// 		]).exec(function(err, docs){
// 		console.log(docs,err);
// 		})
//     });

// });

// var p = new Person({name:"raju"})

// Person.findAndModify({_id:201},[],{$set:p},{returnOriginal:true, upsert:true}, function(err, doc){
// 	console.log(err, doc);
// })