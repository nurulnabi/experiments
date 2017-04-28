/*
* @Author: noor
* @Date:   2017-04-28 11:31:23
* @Last Modified by:   noor
* @Last Modified time: 2017-04-28 12:42:37
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
		return User.update({ _id: id }, { lastLogin: time }).exec();
	};
}
