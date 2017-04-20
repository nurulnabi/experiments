/*
* @Author: noor
* @Date:   2017-04-20 12:05:47
* @Last Modified by:   noor
* @Last Modified time: 2017-04-20 19:22:24
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

SessionService.prototype.remove = function(uid, reason){
	var session = this.sessions[uid];
	if(!session){
		return;
	}
	session.closed(reason);
	delete this.sessions[uid];
	this.adjustSid();
};

SessionService.prototype.getSessionsByUid = function(uids){
	return uids.reduce(function(memo, uid){
		memo.push(this.sessions[uid]);
		return memo;
	},[]);
}

SessionService.prototype.getByUid = function(uid){
	return this.sessions[uid];
}

SessionService.prototype.removeExpired = function(){
	for(var uid in this.sessions){
		var session = this.sessions[uid];
		if(session.isExpired()){
			this.remove(uid, "Session Expired For: "+uid);
		}
	}
}

module.exports = function(){
	return new SessionService();
};