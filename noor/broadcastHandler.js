/**
 *  0.1
 *  BroadcastHandler, Send differnet type of broadcast to users.
 *
 *  @ CreatioSoft All Rights Reserved.
 *  Date: 7 Dec, 2016
 *  programmer: Pankaj Jatav <pankaj@creatiosoft.com>
 *  Javascript file broadcastHandler.js
 */

"use strict";
var broadcastHandler = {}
var async = require('async');
var channelHandler = require('./channelHandler.js');
var config = require('undot')('../shared/config/config.json');
var achvmntTypes = require('undot')('../shared/config/achievements.json');
var gamePlayDelay = require('undot')('../shared/config/config.json');
var helper = require('undot')('app/utils/helper.js');
var helperInstance = new helper();
var sendGCM = require('undot')('app/utils/notificationHandler.js');
var moment = require('moment');		//manupulates time
var friendsHandler = require('./friendsHandler.js');

/**
*
* Call when game is ready
* 
* @param  app     Object   current application object
* @param  session object   session object of user
* @param  data    object   data of user
* 
* @return  boradcast of game ready
*
*/
broadcastHandler.gameReady = function(session, app, data){
	var channelService = app.get('channelService');
	var channel = channelService.getChannel(data.channelId, true);

	var uids = [
		{uid:channel.getMembers()[0], sid:app.get('serverId')},
		{uid:channel.getMembers()[1], sid:app.get('serverId')}
	]

	var findData = {
		query: {
			_id: { $in : channel.getMembers()}
		},
		sort: {},
		limit: 2
	}

	app.rpc.logic.userRemote.find(session, findData, function(res) {
		if(!res.success){
			var resData = {
				success: false, 
				code: 409,
				isFriend:data.isFriend, 
				msg: 'Unable to process request'
			}
			console.log(resData);
			channelService.pushMessageByUids('gameStart', resData , uids);
		} else {
			if(res.data.length){ // && res.data.length == 2){ 
				var usersData = res.data.map(function(data){
					var res = {
						id: data._id,
						name: data.name,
						imageUrl: data.imageUrl,
						characterId: data.characterId
					};
					// res[data._id] = {
					// 	name : data.name,
					// }
					return res;
				})
				var resData = {
					success: true, 
					code: 200, 
					isFriend:data.isFriend,
					msg: 'Game Started Successfully',
					data: usersData
				}	
				console.log(resData);
				channel['startTime'] = moment(new Date()); //sets the game start time
				channelService.pushMessageByUids('gameStart',  resData, uids);
			} else {
				var resData = {
					success: false, 
					code: 409,
					isFriend:data.isFriend,
					msg: 'Unable to process request'
				}
				console.log(resData);
				channelService.pushMessageByUids('gameStart', resData , uids);
			}
		}
	});
}


/**
 * Once game is ready the player joining second will have to wait for initiator reponse
 * @param  {object} session session object
 * @param  {object} app     context object
 * @param  {object} data    channelId,playerId
 * @return {broadcast messages} broadcast messages to both player
 */
broadcastHandler.waitForInitiator = function(session,app,data){
	var channelService = app.get('channelService');
	var channel 	   = channelService.getChannel(data.channelId,false);
	var findData	   = {
							query: {
								_id: { $in : channel.getMembers()}
							},
							sort: {},
							limit: 2
						};

	//this check will ensure not to send the broadcast if channel destroyed because of any reason
	if(!channel){
		console.log(new Error("Bad request channel already destroyed").stack);
		return;
	}

	app.rpc.logic.userRemote.find(session, findData, function(res) {
		if(!res.success){
			var resData = {
				success: false, 
				code: 409, 
				isFriend:data.isFriend,
				msg: 'Unable to process request'
			}
			channel.pushMessage('bothJoined',resData);
		} else {
			if(res.data.length){
				var usersData = res.data.map(function(data){
					var res = {
						id: data._id,
						name: data.name,
						imageUrl: data.imageUrl,
						characterId: data.characterId
					};
					return res;
				});
				var resData = {
					success: true, 
					code: 200,
					isFriend:data.isFriend,
					msg: 'Game is ready to Start',
					data: usersData
				}	
				channel.pushMessage('bothJoined',resData);
			} else {
				var resData = {
					success: false, 
					code: 409, 
					isFriend:data.isFriend,
					msg: 'Unable to process request'
				}
				channel.pushMessage('bothJoined',resData);
			}
		}
	});
}


/**
 * once both friends have joined the same room they can chat before starting the game
 * @param  {Object} session session object
 * @param  {Object} app     context object
 * @param  {Object} data    user data containing message
 * @return {broadcast message}        broadcast the message to both player
 */
broadcastHandler.sendMessage = function(session, app, data, cb){
	var that 		   = this;
		that.app 	   = app;
		that.session   = session;
		that.data 	   = data;
	var userId		   = session.uid;
	var channelId 	   = that.session.get('channelId');
	var channelService = app.get('channelService');
	var channel 	   = channelService.getChannel(channelId,false);
	var data 		   = {	name:data.name,		msg:data.msg	};
	var message 	   = {success:true, code:200,  data:data};
	
	if(!channel){
		cb({success:false, code:400, info:"channel already Destroyed"})
		console.log(new Error("Bad request channel already destroyed").stack);
	}else{
		channel.pushMessage('chatBeforGame', message,function(err,response){
			if(err){
				cb(err);
			}else{
				cb({success:true, code:200, info:"message broadcasted"})
			}
		});
	}
};


/**
*
* Call when user hits
* 
* @param  app     Object   current application object
* @param  cb      callback take the response form the fuction
* @param  data    object   data of user
* 
* @return  boradcast of hit to other player
*
*/
broadcastHandler.hit = function(data, app, cb){
	var channelService = app.get('channelService');
	var channel = channelService.getChannel(data.channelId, true);
	if(channel && !app.get('win-'+data.channelId)) {
		var members = channel.getMembers()
		var uids = [
			{uid:members[1-members.indexOf(data.playerId)], sid:app.get('serverId')}
		]
		var resData = {
			success: true,
			code: 200,
			msg: 'You got shot'
		}
		channelService.pushMessageByUids('playerHit',  resData, uids);
		cb({success: true, code: 200, msg: 'Hit Successfully'});
	} else {
		if(app.get('win-'+data.channelId)) {
			cb({success: false, code: 410, msg: 'Game Over' });
		} else {
			cb({success: false, code: 410, msg: 'Unable to process request' });
			// cb({success: false, code: 409, msg: 'Unable to process request' });
		}
	}
}

/**
*
* Call when user hit player
* 
* @param  app     Object   current application object
* @param  cb      callback take the response form the fuction
* @param  session object   session object of user
* @param  data    object   data of user
* 
* @return  broadcast of final hit
*
*/
broadcastHandler.finalHit = function(data, session, app, cb){
	var channelService = app.get('channelService');
	var channel = channelService.getChannel(data.channelId, true);
	if(channel && !app.get('win-'+data.channelId)) {
		channel['endTime'] = moment(new Date());	//sets the game end time
		var members = channel.getMembers()
		var uids = [
			{uid:members[1-members.indexOf(data.playerId)], sid:app.get('serverId')}
		]
		var resData = {
			success: true,
			code: 200,
			msg: 'You got shot final hit'
		}
		channelService.pushMessageByUids('playerFinalHit',  resData, uids);
		app.set('win-'+data.channelId, data.playerId);
		this.gameOver(data, session, app);
		cb({success: true, code: 200, msg: 'Final Hit Successfully'});
	} else {
		channel['endTime'] = moment(new Date());	//sets the game end time
		if(app.get('win-'+data.channelId)) {
			cb({success: false, code: 410, msg: 'Game Over' });
		} else {
			cb({success: false, code: 410, msg: 'Unable to process request' });
			// cb({success: false, code: 409, msg: 'Unable to process request' });
		}
	}
}


/**
*
* Call when game over
* 
* @param  app     Object   current application object
* @param  session object   session object of user
* @param  data    object   data of user
* 
* @return  broadcast of game player
*
*/
broadcastHandler.gameOver = function(data, session, app){
	var that			  = this;
	var channelService    = app.get('channelService');
	var channel 		  = channelService.getChannel(data.channelId, true);
	var playerUids		  = channel.getMembers();
	if(channel.getMembers().length > 1) {
		var resData = {
			success: true,
			code: 200,
			msg: 'Game Over',
			data: {
				winner: app.get('win-'+data.channelId)
			}
		}
		var uids = channel.getMembers().map(function(data){
			return {uid:data, sid:app.get('serverId')};
		})

		var channelFindData = {
			query:{
				_id:data.channelId
			},
			sort: {},
			limit:1
		};
		app.rpc.logic.channelRemote.find(session, channelFindData, function(res) {
			var playingWithFriend = res.data[0].roomId.split('-')[1] ? true : false;
			channel['endTime'] = !!channel['endTime'] ? channel['endTime'] : moment(new Date());
			var timeDiff = channel['endTime'].diff(channel['startTime'],"ms");
			if(playingWithFriend){
				if(timeDiff > gamePlayDelay.bestTimeFriend){
					timeDiff = timeDiff - gamePlayDelay.bestTimeFriend;
				}
			}else{
				if(timeDiff > gamePlayDelay.bestTimeQick){
					timeDiff = timeDiff - gamePlayDelay.bestTimeQick;
				}
			}
			if(timeDiff <= 0){ //if in any case the difference is negative or zero then calculate fresh differnce considering right now the end of the game
				console.log(channel['endTime'],"+++++bestTime diff is negative or zero++++",channel['startTime']);
				timeDiff = moment(new Date()).diff(channel['startTime'],"ms");
			}
			var theme = res.data[0].roomName;
			if(!res.success || !res.data.length){
				console.log(res);
			} else {
				var bet = res.data[0].roomBet;
				resData.data.bet = bet;
				//update win player
				var winData = {
					bet:bet,
					type: 'win',
					playingWithFriend: playingWithFriend
				}
				app.rpc.logic.userRemote.updateGameOver(session, resData.data.winner ,winData, function(res) {
					// that.achivementUnlock({uids:playerUids} , session, app)
					console.log("winner updated");
				})
				
				//update defeat player
				var members = channel.getMembers()
				var defeater =	members[1-members.indexOf(resData.data.winner)];
				var defeatData = {
					bet:bet,
					type: 'defeat'
				}
				app.rpc.logic.userRemote.updateGameOver(session, defeater, defeatData, function(res) {
					that.achivementUnlock({uids:playerUids} , session, app)
					channelHandler.distroyChannel(data.channelId, session, app);
				})

			}
			//update the bestTime and braodcast gameOver
			var diffData = {
				playerId:resData.data.winner,
				theme: theme,
				bestTime:timeDiff
			};
			helperInstance.updateBestTime(diffData).then(function(res){
				return Promise.all(playerUids.map(function(uid){
					return helperInstance.getBestTime({ playerId:uid, theme: theme});
				}));
			}, function(err){
				console.log(new Error(JSON.stringify(err)).stack);
			}).then(function(docs){
				var data = {};	
				for(var doc of docs){
					// data[doc.playerId] = helperInstance.timeFormatter(doc.bestTime);	//best time for both player
					if(doc.playerId == diffData.playerId){ //best time only for winner
						resData.data['bestTime'] = helperInstance.timeFormatter(doc.bestTime);
					}
				}
				// resData.data.bestTime = data; //insert best time for both player
				channelService.pushMessageByUids('gameOver',  resData, uids);
			}).catch(function(err){
				console.log(new Error(JSON.stringify(err)).stack);
			})
		});
	} else {
		channelHandler.distroyChannel(data.channelId, session, app);
	}
}

/**
*
* Call when user leave the game
* 
* @param  app     Object   current application object
* @param  cb      callback take the response form the fuction
* @param  session object   session object of user
* @param  data    object   data of user
* 
* @return  broadcast of user leave
*
*/
broadcastHandler.leavePlayer = function(data, session, app, cb){
	var channelService = app.get('channelService');
	var channel = channelService.getChannel(data.channelId, true);
	if(channel && !app.get('win-'+data.channelId)) {
		var members = channel.getMembers();
		channel['endTime'] = moment(new Date());	//sets the end time of the game
		if(members.length > 1){
			var uids = [
				{uid:members[1-members.indexOf(data.playerId)], sid:app.get('serverId')}
			]
			var resData = {
				success: true,
				code: 200,
				msg: 'Player Leave the Game'
			}
			channelService.pushMessageByUids('leavePlayer',  resData, uids);
			app.set('win-'+data.channelId, uids[0].uid);
			this.gameOver(data, session, app);
		}
		channelHandler.distroyChannel(data.channelId, session, app);
		cb({success: true, code: 200, msg: 'Leave Successfully'});
	} else {
		cb({success: false, code: 409, msg: 'Unable to process request' });
	}
}

/**
*
* Call when user disconnected from the game
* 
* @param  app     Object   current application object
* @param  cb      callback take the response form the fuction
* @param  session object   session object of user
* @param  data    object   data of user
* 
* @return  broadcast of disconnect player
*
*/
broadcastHandler.disconnectPlayer = function(data, session, app){
	var channelService = app.get('channelService');
	var channel = channelService.getChannel(data.channelId, true);
	if(channel && !app.get('win-'+data.channelId)) {
		var members = channel.getMembers();
		if(members.length > 1){
			var uids = [
				{uid:members[1-members.indexOf(data.playerId)], sid:app.get('serverId')}
			]
			var resData = {
				success: true,
				code: 200,
				msg: 'Player Disconnect from the Game'
			}
			channelService.pushMessageByUids('disconnectPlayer',  resData, uids);
			app.set('win-'+data.channelId, uids[0].uid);
		}
		this.gameOver(data, session, app);
	}
}

/**
*
* Call when user unlock a achievement
* 
* @param  app     Object   current application object
* @param  session object   session object of user
* @param  data    object   data of user
* 
* @return  broadcast of user unlock achievement
*
*/
broadcastHandler.achivementUnlock = function(data, session, app) {
	var that = this;
	var channelService = app.get("channelService");
	//no matter what achievement you are searching for don't ommit 'id' from findData
	var findData = [];
	for( var type of achvmntTypes['gamePlayAchievements']){
		findData.push(type);
	}

	Promise.all(data['uids'].map(function(uid){
		return	helperInstance.getKeyValPairForUser(uid, findData);
	})).then(function(users){
		for(var user of users){
			var uid = user.id;
			delete user['id'];
			(function(playerId,user){
				Promise.all(Object.keys(user).map(function(key){
					return that.getAchivementByCategory({ app:app, session:session, type:key, value:user[key], playerId:playerId});
				})).then(function(achievements){
					console.log(achievements,"++++++++achievements++++++++++++");
					var status = false; 	//if true means user has some achievements so broadcast
					var counter = -1;
					for(var achvmnt of achievements){
						counter++;
						if(!!achvmnt){
							status = true;
							(function(insertData, achvmntBrdcst, delayCounter){
								app.rpc.logic.achievementRemote.insert(session, insertData,function(res) {
									console.log(res);
									if(res.success && res.data !== true){ //already unlocked don't send broadcast
										helperInstance.getAllAchivementsByType().then(function(achvmntTypes){
											console.log(achvmntTypes,"================================");
											var counter = 0;
											for(var key in achvmntTypes){
												counter++;
												var doc = achvmntTypes[key];
												if(doc.type == achvmntBrdcst.type){
													achvmntBrdcst.achievementNo = counter;
													// achvmntBrdcst.achievementNo = parseInt(key)+1;
													break;
												}
											}
											//channelService.pushMessageByUids('achivementUnlock',  {msg:"You have unlocked some achievements", achievement: achvmntBrdcst }, [{uid:playerId, sid:app.getServerId()}]);
											console.log('Achivement Unlocked Before', playerId);
											setTimeout(function(){
												channelService.pushMessageByUids('achivementUnlock',  {msg:"You have unlocked some achievements", achievement: achvmntBrdcst }, [{uid:playerId, sid:app.getServerId()}]);
											},2000*delayCounter);
											console.log('Achivement Unlocked After');
										}).catch(function(err){
											reject({ success: false, code:400, msg:err})
										})
									}
								});
							})({ achievementId:achvmnt._id, playerId:playerId, isCollect:false, stars:achvmnt.stars},{ type:achvmnt.type, _id:achvmnt._id, coins:achvmnt.coins }, counter);
						}
					}
					// if(status){
					// 	channelService.pushMessageByUids('achivementUnlock',  {msg:"You have unlocked some achievements"}, [{uid:playerId, sid:app.getServerId()}]);
					// }
				}).catch(function(err){
					console.log(new Error(JSON.stringify(err)).stack);
				})
			})(uid,user);
		}
	}, 
	function(err){
		console.log(new Error(JSON.stringify(err)).stack);
	})
}

/**
*
* Call when user send a friend request
* 
* @param  app     Object   current application object
* @param  cb      callback take the response form the fuction
* @param  session object   session object of user
* @param  data    object   data of user
* 
* @return  broadcast of frend request player
*
*/
broadcastHandler.friendRequest = function(data, session, app) {
	var channelService = app.get('channelService');
	var uids = [
				{uid: data.friendId, sid:app.get('serverId')}
			]
	var findData = {
		query:{
			_id: data.playerId
		},
		sort: {},
		limit: 1,
	}
	app.rpc.logic.userRemote.find(session, findData, function(res) {
		if(res.success && res.data.length) {
			var dataToBroadcast = {
				success: true,
				msg:'Friend request recieved',
				code:200,
				data: {
					id: res.data[0]._id,
					name: res.data[0].name,
					status: config.requestStatus.pending
				}	
			}
			helperInstance.pendingRequestCount(data.friendId, function(result) {
				if (result.success) {
					dataToBroadcast.data.pendingFriendRequestCount = result.data;
				}
				channelService.pushMessageByUids('getFriendReqest',  dataToBroadcast, uids);
			})
      	}
	});
}

/**
*
* Call when user send a friend request
* 
* @param  app     Object   current application object
* @param  cb      callback take the response form the fuction
* @param  session object   session object of user
* @param  data    object   data of user
* 
* @return  broadcast of frend request player
*
*/
broadcastHandler.acceptFriendRequest = function(data, session, app) {
	var channelService = app.get('channelService');
	var uids = [
				{uid: data.friendId, sid:app.get('serverId')}
			]
	var findData = {
		query:{
			_id: data.playerId
		},
		sort: {},
		limit: 1,
	}
	app.rpc.logic.userRemote.find(session, findData, function(res) {
		if(res.success && res.data.length) {
			var dataToBroadcast = {
				success: true,
				msg:'Friend request accepted',
				code:200,
				data: {
					id: res.data[0]._id,
					name: res.data[0].name,
					status: config.requestStatus.accepted,
					pendingFriendRequestCount: data.pendingFriendRequestCount
				}	
			}
			channelService.pushMessageByUids('acceptFriendRequest',  dataToBroadcast, uids);
      	}
	});
}

/**
*
* Call when user deletes a friend
* 
* @param  app     Object   current application object
* @param  cb      callback take the response from the function
* @param  session object   session object of user
* @param  data    object   data of user
* 
* @return  broadcast of friend deleted
*
*/
broadcastHandler.deleteFriend = function(data, session, app) {
	var channelService = app.get('channelService');
	var uids = [
				{uid: data.friendId, sid:app.get('serverId')}
			]
	var findData = {
		query:{
			_id: data.playerId
		},
		sort: {},
		limit: 1,
	}
	app.rpc.logic.userRemote.find(session, findData, function(res) {
		if(res.success && res.data.length) {
			var dataToBroadcast = {
				success: true,
				msg:'Friend Deleted',
				code:200,
				data: {
					id: res.data[0]._id,
					name: res.data[0].name	
				}			
			}
			channelService.pushMessageByUids('deleteFriend',  dataToBroadcast, uids);
			console.log('broadcast done: broadcastHandler.deleteFriend');
      	}
	});
}


/**
*
* Call when user send a game invite
* 
* @param  app     Object   current application object
* @param  cb      callback take the response form the fuction
* @param  session object   session object of user
* @param  data    object   data of user
* 
* @return  broadcast of game invite
*
*/
broadcastHandler.sendInvite = function(data, session, app) {
	var channelService = app.get('channelService');
	var uids = [
				{uid: data.friendId, sid:app.get('serverId')}
			]
	var findData = {
		query:{
			_id: data.playerId
		},
		sort: {},
		limit: 1,
	}
	app.rpc.logic.userRemote.find(session, findData, function(res) {
		if(res.success && res.data.length) {
			var dataToBroadcast = {
				success: true,
				msg:'Game Invite recieved',
				code:200,
				data: {}
			}
			dataToBroadcast.data = {
				friendId: res.data[0]._id,
				friendName: res.data[0].name,
				roomId: data.roomId,
				status: config.requestStatus.pending,
				roomName: data.roomName,
				roomBet: data.roomBet
			}
			// count pendingGameInviteCount -> friendId
			helperInstance.pendingGameInviteCount(data.friendId, function(result){
				if (result.success) {
					dataToBroadcast.data["pendingGameInviteCount"] = result.data;
				} else{
					//one in millions case
					dataToBroadcast.data["pendingGameInviteCount"] = 0;
				};

				//if online send broadcast else push notification
				if(app.get('sessionService').getByUid(data.friendId)){
					channelService.pushMessageByUids('getGameInvite',  dataToBroadcast, uids);
				}else{
					dataToBroadcast.data['playerId'] = data.friendId;
					var findData = {
						query:{
							_id: data.friendId
						},
						sort: {},
						limit: 1,
					}
					app.rpc.logic.userRemote.find(session, findData, function(resFrnd) {
						sendGCM(dataToBroadcast.data, resFrnd.data[0].registrationId).then(function(res){
							console.log(res);
						})
						.catch(function(err){
							console.log(new Error(JSON.stringify(err)).stack);
						})
					});
				}
			})
      	}
	});
}

/**
 * this will broadcast that this user has logged in or logged out
 * @param  {Object} session user session
 * @param  {Context} app     app context
 * @param  {Boolean} status  if true means online if false means offline
 * @return {Object}  promise promise object
 */
broadcastHandler.broadcastMyStatus = function(session, app, status){
	var that = this;
	var playerId = session.get('playerId');
	return new Promise(function(resolve, reject){
		friendsHandler.getFriendsWithStatus({ playerId:playerId }, session, app, function(res){
			if(res.success){
				var friends = res.data;
				var uids = [];
				for(var friendId in friends){
					if(friends[friendId].isOnline){
						uids.push({
							uid:friendId,
							sid:app.getServerId()
						});
					}
				}
				app.rpc.logic.userRemote.get(session, playerId,
				  ['name'], function(res) {
				  	if(res.success){
						var data = {};
						data['id'] = playerId;
						data['name'] = res.data.name;
						data['status'] = 1;
						data['isOnline'] = status;
						var channelService = app.get("channelService");
						channelService.pushMessageByUids("friendOnlineStatus", { data: data }, uids);
						resolve({success:true, code:200, msg:"Status broadcasted"});
					}else{
						reject(res);
					}
				});
			}else{
				reject(res);
			}
		});
	});
}



/**
*
* Call to get player specific keys/value info by Id, given the keys
* 
* @param  callbacl  callback take the response form the fuction
* @param  params    object   data of user
* 
* @return  player info
*
*/
broadcastHandler.getPlayerById = function(params, findData){
	return new Promise(function(resolve, reject){
		params.app.rpc.logic.userRemote.get(params.session, params.playerId, findData, function(res) {
			if(!res.success){
				reject(res);
			} else {
				resolve(res.data);
			}
		});
	});
};

/**
* Call to get achievement by achievement type
*/
broadcastHandler.getAchivementByCategory = function(params){
	var findData =  {
		query: {
			type:params.type,	total:params.value
		},
		sort:{},
		limit:0
	}
	// console.log(findData,"++++++++++++findData++++++++++");
	return helperInstance.getLockedUnlockedAchvmnts(params)
	.then(function(allData){
	 var allAchvmnts = [];
		allData.allLockedAchvmnt.map(function(data){
			allData.allUnlckdAchvmnt.map(function(unlockData){
				if(data._id == unlockData.achievementId){
					allAchvmnts.push(data);
				}
			});
		});

		return allAchvmnts;
	})
	.then(function(data){
		var total = 0;
		if(data.length > 0){
			total = data.reduce(function(memo, achvmnt){
				memo = memo+achvmnt.total;
				return memo;
			},0);
		}
		findData.query.total = findData.query.total - total;

		console.log(findData,"+++++++++++getAchivementByCategory+++++++++++",total,findData.query.type);
		return new Promise(function(resolve, reject){
			params.app.rpc.logic.achievementRemote.getAchivementByCategory(params.session, findData, function(res){
				if(res.success){
					resolve(res.data);
				}else{
					reject(JSON.stringify(res));
				}
			});
		});
	})

	// return new Promise(function(resolve, reject){
	// 	params.app.rpc.logic.achievementRemote.getAchivementByCategory(params.session, findData, function(res){
	// 		if(res.success){
	// 			resolve(res.data);
	// 		}else{
	// 			reject(JSON.stringify(res));
	// 		}
	// 	});
	// });
};

module.exports = broadcastHandler;