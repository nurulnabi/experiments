/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-03-23 16:21:11
* @Last Modified by:   nurulnabi
* @Last Modified time: 2017-03-30 00:44:44
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

personSchema.index({_id:1},{unique:false});
personSchema.query.byAge = function(){
	return this.find({ age:{$gte:26}});
}

personSchema.query.selectName = function(){
	return this.find({name:"raju"}).select({_id:0, name:1, age:1});
}

personSchema.methods.findSimilar = function(){
	return this.model("Story").find({_creator:this._id});
}

personSchema.virtual('myAge').get(function(){
	var min, sec, ms, age = this.age;
	ms              = age%1000;
	age       		= Math.floor((age-ms)/1000);
	sec             = age > 60 ? age%60 : age;
	min             = Math.floor((age-sec)/60);
	return min+":"+sec+":"+ms;
});