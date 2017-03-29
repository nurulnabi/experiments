/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-03-23 16:45:13
* @Last Modified by:   noor
* @Last Modified time: 2017-03-27 12:54:25
*/

var mongoose = require('mongoose');
var Person = mongoose.model("Person");
var Story = mongoose.model("Story");


var noor = new Person({
	_id:999,
	name:"sfdsfa",
	age:24
});

// Person.find().byAge().selectName().exec(function(err,res){
// 	console.log(err,res);
// })

// Person.findOne({name:"noor"},function(err,res){
// 	console.log(res);
// 	res.findSimilar().exec(function(err,res){
// 		console.log(res);
// 	})
// })

// noor.findSimilar().exec(function(err,res){
// 	console.log(res);
// })

// Person.find().exec(function(err,res){
// 	res.forEach(function(doc){
// 		console.log(doc.myAge);
// 	})
// })


var usrs = [
	new Person({_id:123, name:"noor", age:10}),
	new Person({_id:124, name:"rahul", age:11}),
	new Person({_id:125, name:"sanjay", age:12}),
	new Person({_id:126, name:"mukesh", age:55}),
	new Person({_id:127, name:"ramu", age:59}),
	new Person({_id:129, name:"saurav", age:97})
]

var age = 20;

for(var usr of usrs){
	age++;
	console.log("inserted");
	Person.create({_id:age, name:"noor", age:age}, function(err,doc){
		console.log(err,doc);
	})
}