/*
* @Author: noor
* @Date:   2017-04-20 17:09:03
* @Last Modified by:   noor
* @Last Modified time: 2017-04-20 17:32:58
*/

var _ = require('underscore');

module.exports = function(app){
	return new Channel(app);
}

var Channel = function(app){
	this.app = app;
}

Channel.prototype.pushMessageByUids = function(route, data, uids){
	var sessionService = this.app.sessionService;
	var sessions = sessionService.getSessionsByUid(uids);
	var sockets = _.pluck(sessions,"__socket__");
	sockets.forEach(function(socket){
		socket.emit(route, data);
	});
	console.log("message broadcasted to: ",uids);
}

Channel.prototype.pushMessage = function(route, data){
	this.app.socketConn.emit(route, data);
	console.log("message broadcasted to all");
}