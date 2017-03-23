/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-03-23 16:21:11
* @Last Modified by:   noor
* @Last Modified time: 2017-03-23 16:41:09
*/

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/mongoose");
var Schema = mongoose.Schema;

var personSchema = Schema({
	_id: Number,
	name:String,
	age:Number,
	stories:[{type: Schema.Types.ObjectId, ref:'Story'}]
});

var storySchema = Schema({
	_creator:{ type: Number, ref: 'Person'},
	title: String,
	fans: [{type: Number, ref:'Person'}]
});

var Story = mongoose.model("Story",storySchema);
var Person = mongoose.model("Person", personSchema);