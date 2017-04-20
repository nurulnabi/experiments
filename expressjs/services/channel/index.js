/*
* @Author: noor
* @Date:   2017-04-20 15:55:59
* @Last Modified by:   noor
* @Last Modified time: 2017-04-20 16:49:03
*/



module.exports = function(server, app){
	var sessionService = app.sessionService;
	var io = require('socket.io')(server);
	var chatInfra = io.of('/')
		.on('connection', function(socket){
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