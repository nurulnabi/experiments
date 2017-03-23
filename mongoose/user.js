/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-03-23 16:45:13
* @Last Modified by:   noor
* @Last Modified time: 2017-03-23 19:40:27
*/

var mongoose = require('mongoose');
var Person = mongoose.model("Person");
var Story = mongoose.model("Story");


var noor = new Person({
	_id:150,
	name:"ansari",
	age:25
});

noor.save(function(err, pdoc){
	if(!err){
		// var story = new Story({
		// 	title:"Once Upon Man",
		// 	_creator:noor._id
		// });

		// story.save(function(err, sdoc){
		// 	if(!err){
		// 		console.log(sdoc);
		// 	}
		// });
		console.log(pdoc);
	}
});