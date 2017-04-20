/*
* @Author: noor
* @Date:   2017-04-20 12:05:47
* @Last Modified by:   noor
* @Last Modified time: 2017-04-20 16:26:57
*/

var Session = require('./session.js');

var SessionService = function(){
	this.sessions = {}		// uid->session
	this.totalSessions = 0;
};

SessionService.prototype.getSid = function(){
	this.totalSessions += 1;
	return this.totalSessions;
};

SessionService.prototype.adjustSid = function(){
	this.totalSessions -= 1;
};

SessionService.prototype.create = function(uid, socket, expireAt){
	var session = new Session(this.getSid(), socket, this, expireAt);
	this.sessions[uid] = session;
	return session;
};

SessionService.prototype.remove = function(uid){
	var session = this.sessions[uid];
	if(!session){
		return;
	}
	session.closed();
	delete this.sessions[uid];
	this.adjustSid();
};

module.exports = SessionService;