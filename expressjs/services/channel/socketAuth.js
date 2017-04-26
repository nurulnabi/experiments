/*
* @Author: noor
* @Date:   2017-04-26 18:02:10
* @Last Modified by:   noor
* @Last Modified time: 2017-04-26 18:11:26
*/

var socket = require('socket.io');
module.exports = function(app){
	return new sockAuth(app);
};

var sockAuth = function(app){
	this.app = app;
};

