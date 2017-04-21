/*
* @Author: noor
* @Date:   2017-04-20 12:05:02
* @Last Modified by:   noor
* @Last Modified time: 2017-04-21 14:43:05
*/

var EventEmitter = require('events').EventEmitter;
var ST_INITED = 0;
var ST_CLOSED = 1;

var Session = function(sid, socket, service, expireAt){

	this.id 	 			= sid;
	this.uid 				= null;					// uid given to the user
	this.userId 			= null;					// userId used internally to perfom operation
	this.data 				= {};
	this.lastRequest 		= new Date().getTime();
	this.__state__ 			= ST_INITED;
	this.__time__			= new Date().getTime();
	this.__expireAt__		= expireAt || null;
	this.__socket__ 		= socket;
	this.__sessionService__ = service;
};

Session.prototype.__proto__ = EventEmitter.prototype;

Session.prototype.get = function(key){
	return this.data[key];
};

Session.prototype.bind = function(uid){
	this.uid = uid;
	var self = this;
	process.nextTick(function(){
		self.emit('bind', uid);
	});
};

Session.prototype.unbind = function(uid){
	this.uid = null;
	var self = this;
	process.nextTick(function(){
		self.emit('unbind', uid);
	});
};

Session.prototype.closed = function(reason){
  if(this.__state__ === ST_CLOSED) {
    return;
  }
  this.__state__ = ST_CLOSED;
  this.__sessionService__.remove(this.id);
  this.emit('closed', reason);
  this.__socket__.emit('closing', reason);

  var self = this;
  // give a chance to send disconnect message to client

  process.nextTick(function() {
    self.__socket__.disconnect();
    self.clear();
  });
};

Session.prototype.set = function(key, value){
	this.data[key] = value;
};

Session.prototype.isExpired = function(){
	if(!this.expireAt){
		return false;
	}
	var time = new Date().getTime();
	if(time >= this.__expireAt__){
		return true;
	}
};

Session.prototype.clear = function(){
	this.id 	 			= null;
	this.uid 				= null;					// uid given to the user
	this.userId 			= null;					// userId used internally to perfom operation
	this.data 				= null;
	this.__state__ 			= null;
	this.__time__			= null;
	this.__expireAt__		= null;
	this.__socket__ 		= null;
	this.__sessionService__ = null;
}

Session.prototype.getUserId = function(){
	return this.userId;
}

module.exports = Session;