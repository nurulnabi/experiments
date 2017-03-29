/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-03-23 16:20:42
* @Last Modified by:   nurulnabi
* @Last Modified time: 2017-03-25 15:07:02
*/

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var readySchema = require('./mongoose');
var Person = mongoose.model("Person");
var Story = mongoose.model("Story");
var users = require('./user');

// Story
// 	.findOne({title: "Once upon a timex."})
// 	.populate('_creator')
// 	.exec(function(err, story){
// 		console.log(`Error: ${err}, story:${story}`);
// 	})