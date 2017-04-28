/*
* @Author: noor
* @Date:   2017-04-28 17:42:41
* @Last Modified by:   noor
* @Last Modified time: 2017-04-28 18:19:48
*/

var response =  function(){
	
}

response.prototype.addSuccess = function(val){
	this.success = val;
	return this;
};

response.prototype.addInfo = function(info){
	this.info = info;
	return this;
}

response.prototype.addMessage = function(msg){
	this.msg = msg;
	return this;
};

response.prototype.addCode = function(code){
	this.code = code
	return this;
};

response.prototype.getSuccess = function(key, msg){
	this.success = true;
	this.code    = 200;
	this.msg 	 = msg[key];
	return this;
};

response.prototype.getFailure = function(key, msg){
	this.success = false;
	this.code    = 404;
	this.msg 	 = msg[key];
	return this;
};

response.prototype.addKeyValue = function(key, value){
	this[key] = value;
	return;
};

module.exports = response;
