/*
* @Author: noor
* @Date:   2017-04-20 15:55:59
* @Last Modified by:   noor
* @Last Modified time: 2017-04-20 17:33:35
*/



module.exports = function(server, app){
	var sessionService = app.sessionService;
	var io = require('socket.io')(server);
	var allUser = io.of('/');
	app.socketConn = allUser;
	var channelService = app.channelService;
	setTimeout(function(){
		channelService.pushMessage("new message", "this is a broadcast message");
	},5000);

	allUser.on('connection', function(socket){
		// console.log(socket);
		var session = sessionService.create(socket.conn.id, socket);
		session.bind(socket.conn.id);
		session.on('bind',function(uid){
			console.log("userid: ",uid,"connected");
		})
		session.on('closed',function(data){
			console.log("user logged out",data);
		})
		socket.emit("server", { token: socket.conn.id });
		socket.on('closed', function(data){
			sessionService.remove(session.uid);
		})
		socket.on('disconnect', function(data){
			sessionService.remove(session.uid);
		})
	});
}