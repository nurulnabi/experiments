/*
* This service will create a session for all incomming requests and store for x minutes
* after that the object will be destroyed this service is to avoid the denial of service attacks
* @Author: noor
* @Date:   2017-04-28 18:27:36
* @Last Modified by:   noor
* @Last Modified time: 2017-04-28 19:06:54
*/

var values = require('../config/globalValues');

var volatileSession = function(){
	this.sessions = {};
	this.removeSession = function(){
		var time = new Date().getDate();
		for(var key in this.sessions){
			if(this.sessions[key].time <= time){
				delete this.sessions[id];
			}
		}
	};
}


module.exports = function(app){
	var volatileSession = new volatileSession();
	app.volatileSession = volatileSession;
	
	setInterval(function(app){
		this.volatileSession.removeSession();
	}.bind(app),values.timeToKickVolatileSession);

	app.use("/", function(req, res, next){
		var ip = req.headers.host;		//ip:port
		console.log("in kicker function for: ", ip);
		var session = app.volatileSession ? app.volatileSession[ip] : undefined;
		if(session == undefined){
			var data = {
				status: true,
				time: new Date().getDate()
			}
			app.volatileSession.sessions[ip] = data;
			return next();
		}else if(session['status'] == false){
			return next(new Error());
		}
	})
}