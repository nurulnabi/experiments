/*
* @Author: noor
* @Date:   2017-04-28 11:31:23
* @Last Modified by:   noor
* @Last Modified time: 2017-04-28 16:45:37
*/

var mongoose = require('mongoose');
var User 	 = mongoose.model('User');

module.exports = function(app){
	this.getUserByEmail = function(email){
		return User.findOne({ email: email }).exec();
	};

	this.getUserById = function(id){
		return User.findOne({ _id: id }).exec();
	};

	this.invalidLogin = function(id){
		return User.update({ _id: id }, { $inc:{ invalidLoginAttempts: 1}} ).exec();
	};

	this.loginAttempt = function(id, time){
		var data = { 
			$set:{ lastLogin: time },
			$inc:{ invalidLoginAttempts: 1}
		};
		if(!time){		//this is valid login attemp
			data['$set'].invalidLoginAttempts = 0,
			delete data['$inc'];
		}

		return User.update({ _id: id, lastLogin:{ $lte: new Date().getTime() }}, data).exec();
	};
}
