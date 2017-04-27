/*
* @Author: noor
* @Date:   2017-04-20 15:55:59
* @Last Modified by:   noor
* @Last Modified time: 2017-04-27 18:31:22
*/



module.exports = function(server, app){
	var sessionService = app.sessionService;
	var io = require('socket.io')(server);
	var getUid = require('uuid/v4');

	var allUser = io.of('/');
	app.socketConn = allUser;

	allUser.on('connection', function(socket){
		console.log(socket);
		socket.on("client",function(data){
			console.log(data,"From Client");
		})
		// console.log(socket.conn);
		// console.log(socket);
		var uid = getUid();
		var session = sessionService.create(uid, socket);
		session.bind(uid);
		session.on('bind',function(uid){
			console.log("uid: ",uid,"connected");
		})
		session.on('closed',function(data){
			console.log("user logged out",data);
		})
		socket.emit("server", { token: uid });
		socket.on('closed', function(data){
			sessionService.remove(session.uid);
		})
		socket.on('disconnect', function(data){
			sessionService.remove(session.uid);
		})
	});
}