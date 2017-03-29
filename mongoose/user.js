/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-03-23 16:45:13
* @Last Modified by:   nurulnabi
* @Last Modified time: 2017-03-30 00:45:13
*/

var mongoose = require('mongoose');
var Person = mongoose.model("Person");
var Story = mongoose.model("Story");


var aaron = [];
aaron.push(new Person({ _id: 0, name: 'Aaron', age: 100 }));
aaron.push(new Person({ _id: 1, name: 'noor', age: 50 }));
aaron.push(new Person({ _id: 1, name: 'nabi', age: 18 }));
aaron.push(new Person({ _id: 2, name: 'ansari', age: 24 }));
aaron.push(new Person({ _id: 0, name: 'md', age: 54 }));

Person.create(aaron,function (err) {
  if (err) return console.log(err);
  
  var story1 = new Story({
    title: "Once upon a timex.",
    _creator: aaron[0]._id    // assign the _id from the person
  });
  
  story1.save(function (err) {
    if (err) return console.log(err);
    // thats it!
  });
});

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
