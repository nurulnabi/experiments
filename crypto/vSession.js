/*
* @Author: noor
* @Date:   2017-04-28 19:04:17
* @Last Modified by:   noor
* @Last Modified time: 2017-04-28 19:24:26
*/

var volatileSession = function(){
	this.sessions = {};
	this.removeSession = function(){
		console.log("total vSession: ", this.sessions);
		var time = new Date().getTime();
		for(var key in this.sessions){
			if(this.sessions[key].time <= time){
				console.log("session found to kick: ", key);
				delete this.sessions[key];
			}
		}
	};
}


module.exports = function(app){
	console.log("added========");
	var vSession = new volatileSession();
	app.vSession = vSession;
	

	app.use("/", function(req, res, next){
		console.log("kicker function executed");
		var address = req.socket._peername;
		var ip = address.address.split(":")[3]+address.port;		//ip:port
		var session = app.vSession ? app.vSession[ip] : undefined;
		if(session == undefined){
			var data = {
				status: true,
				time: (new Date().getTime())+1000*30
			}
			app.vSession.sessions[ip] = data;
			return next();
		}else if(session['status'] == false){
			return next(new Error());
		}
	});
	
	setInterval(function(app){
		console.log("setInterval===========");
		this.vSession.removeSession();
	}.bind(app),5000);
}