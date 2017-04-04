/**
 *  0.1
 *  AchievementHandler, Perfrom achievement related query
 *
 *  @ CreatioSoft All Rights Reserved.
 *  Date: 9 Dec, 2016
 *  programmer: Pankaj Jatav <pankaj@creatiosoft.com>
 *  Javascript file achievementHandler.js
 */

"use strict";
var achievementHandler = {};
var async = require('async');
var broadcastHandler = require('./broadcastHandler.js');
var gamePlayAchievements = require('undot')('../shared/config/achievements.json')['gamePlayAchievements'];
var otherAchievements = require('undot')('../shared/config/achievements.json')['otherAchievements'];
var oneTimeAchievements = require('undot')('../shared/config/achievements.json')['oneTimeAchievements'];
var helper = require('undot')('app/utils/helper.js');
var helperInstance = new helper();


/**
*
* Call to get achievement list of user
* 
* @param  app     Object   current application object
* @param  cb      callback take the response form the fuction
* @param  session object   session object of user
* @param  data    object   data of user
* 
* @return  achivement list in callback
*
*/
achievementHandler.getList = function(data, session, app, cb) {
	var params = {
		data: data,
		app: app,
		session: session
	}
	async.waterfall([
		async.apply(allAchieventList, params),
		allUnlockAchieventList,
		allUserAchieventList,
		groupAchievementsByType,
		getAllCurrentAchvmnts,
		calculatePercentageCompleted,
		adjustStarsOfAchievements],
		function(err, result){
			if(err){
				cb({success: false, code: 409, msg: 'Unable to process request'});
			} else {
				cb({success: true, code: 200, msg: 'Find Successfully', data:result.currentAchvmnts});
			}
		}
	)
};

/**
*
* Call to collect achievement
* 
* @param  app     Object   current application object
* @param  cb      callback take the response form the fuction
* @param  session object   session object of user
* @param  data    object   data of user
* 
* @return  status of achivement collect in callback
* 
*/
achievementHandler.collect = function(data, session, app, cb) {
	var updateData = {
		selector: {
			achievementId: data.achievementId,
			playerId: data.playerId
		},
		update: {
			'$set':{
				isCollect: true
			}
		}
	};
	app.rpc.logic.achievementRemote.update(session, updateData, function(res) {
		if(!res.success){
			cb({success: false, code: 409, msg: 'Unable to process request'});
      	}else{
      		var params = {
      			data: data,
      			app: app,
      			session: session
      		};
      		getUpdateAchievement(params, function(res){
      			cb({success: true, code:200, data:res.data});
      		});
	    }
	});
}


/**
 * this will create those achievements which can be availed only once like add on instagram or purchase
 * @param  {Object}   data    User and achievement Info
 * @param  {Object}   session User session
 * @param  {Object}   app     Context App
 * @return {[type]}           [description]
 */
achievementHandler.createOneTimeAchievement = function(data, session, app){
	//query will be setted later on
	var findUnlockAchvmnt = {
		query:{},
		sort:{},
		limit:1
	};
	var findLockAchvmnt = {
		query:{ type: data.type },
		sort:{},
		limit:1
	};
	var channelService = app.get("channelService");

	return new Promise(function(resolve, reject){
		app.rpc.logic.achievementRemote.find(session, findLockAchvmnt, function(res) {
			if(!res.success){
				reject(res);
			} else if( res.data.length == 1 ) {
				findUnlockAchvmnt.query.achievementId = res.data[0]._id;
				findUnlockAchvmnt.query.playerId = data.playerId;
				var insertData = { achievementId:res.data[0]._id, playerId:data.playerId, isCollect:false, stars:res.data[0].stars};
				var achvmntBrdcst = { _id:res.data[0]._id, type:res.data[0].type, coins:res.data[0].coins };
				app.rpc.logic.achievementRemote.findUnlock(session, findUnlockAchvmnt, function(res){
					if(res.success && res.data.length >= 1){	//achievement already unlocked
						reject({success: false, code:200, msg:"Achivement already Unlocked" });
					}else if(res.success && res.data.length == 0){
						app.rpc.logic.achievementRemote.insert(session, insertData,function(res) {
							if(res.success){
								console.log(res);
								helperInstance.getAllAchivementsByType().then(function(achvmntTypes){
									var counter = 0;
									for(var key in achvmntTypes){
										var doc = achvmntTypes[key];
										counter++;
										if(doc.type == achvmntBrdcst.type){
											achvmntBrdcst.achievementNo = counter;
											// achvmntBrdcst.achievementNo = parseInt(key)+1;
											break;
										}
									}
									channelService.pushMessageByUids('achivementUnlock',  {msg:"You have unlocked some achievements", achievement:achvmntBrdcst}, [{uid:data.playerId, sid:app.getServerId()}]);
								}).catch(function(err){
									reject({ success: false, code:400, msg:err})
								})
								resolve({success: true, code:200, data:res.data, msg:res.msg })
							}else{
								reject(res);
							}
						});
					}else{
						reject({ success: false, code:400, msg:res});
					}
				});
			}else{
				reject({ success: false, code:400, msg:res });
			}
		});
	});
}

module.exports = achievementHandler;

/**
*
* Call to get all achievement
* 
* @param  session  object   session object of user
* @param  params   object   data of user
* 
* @return  all achivements in callback
*
*/
function allAchieventList(params, callback){
	params.app.rpc.logic.achievementRemote.list(params.session, function(res) {
		if(!res.success){
			callback('Error Occues');
		} else {
			params.allAchieventList = res.data;
			callback(null,params);
		}
	});
}

/**
*
* Call to get all user unlock achievement
* 
* @param  session  object   session object of user
* @param  params   object   data of user
* 
* @return  all unlock achivements in callback
*
*/
function allUnlockAchieventList(params, callback){
	var findData = {
		query:{ playerId : params.data.playerId },
		sort:{},
		limit:0
	}
	params.app.rpc.logic.achievementRemote.findUnlock(params.session, findData, function(res) {
		if(!res.success){
			callback('Error Occues');
		} else {
			params.allUnlockAchieventList = res.data;
			callback(null,params);
		}
	});
}

/**
*
* Call to get all user achievement
* 
* @param  session  object   session object of user
* @param  params   object   data of user
* 
* @return  all user achivements in callback
*
*/
function allUserAchieventList(params, callback){
	params.res = {};
	params.allAchieventList.map(function(data){
		params.res[data._id] = {
			type: data.type,
			title:data.title,
			stars:data.stars,
			total: data.total,
			coins:data.coins,
			isUnlock: false,
			isCollect: false,
			msg:data.msg
		}
		params.allUnlockAchieventList.map(function(unlockData){
			if(data._id == unlockData.achievementId){
				params.res[data._id].isUnlock = true;
				params.res[data._id].isCollect = unlockData.isCollect;
			}
		});
	});
	callback(null,params);
}

/**
 * this will calculate the percentage completion of unlocked/locked achievements
* @param  session  object   session object of user
* @param  params   object   data of user
* 
* @return  all user achivements in callback
*
*/
function calculatePercentageCompleted(params, next){
	var allAchvmnts = params.currentAchvmnts;
	var queryData = { session: params.session, app:params.app, playerId:params.data.playerId };
	for(var val of otherAchievements){
		gamePlayAchievements.push(val);
	}

	broadcastHandler.getPlayerById(queryData, gamePlayAchievements).then(function(user){
		for(var achvmntId in allAchvmnts){
			var achvmnt = allAchvmnts[achvmntId];
			if(!achvmnt.isUnlock && user.hasOwnProperty(achvmnt.type)){
				// var percent = (user[achvmnt.type]/achvmnt.total)*100;
				var diff = Math.abs(user[achvmnt.type] - achvmnt.totalB);
				var percent = (diff/achvmnt.total)*100;
				console.log(`percent-${percent},user[achvmnt.type]-${user[achvmnt.type]},achvmnt.type-${achvmnt.type},achvmnt.total,$$$$$$$$$$$$$$$$$$$$$$$`);
				// if(user[achvmnt.type] <= achvmnt.total){
				if(diff <= achvmnt.total){
					achvmnt.percentCompleted = Math.floor(percent);
				}
				else{	//that case when user has unlocked this achievement but has not claimed yet.
					achvmnt.isUnlock = true;
					achvmnt.percentCompleted = 100;
				}
			}else{
				if(oneTimeAchievements.indexOf(achvmnt.type) >= 0 && achvmnt.isUnlock){ //for oneTimeAchievements like addOnInsta/makePurchase and is unlocked
					achvmnt.percentCompleted = 100;
				}else if(oneTimeAchievements.indexOf(achvmnt.type) >= 0 && !achvmnt.isUnlock){ //for oneTimeAchievements like addOnInsta/makePurchase and is still locked
					achvmnt.percentCompleted = 0;
				}else{
					achvmnt.percentCompleted = 100;
				}
			}
		}
		next(null, params);
	}).catch(function(err){
		next(err, params);
	});
}

/**
 * this function groups the achievements of same type in a single object
 * @param  {Object}   params  achievements info
 * @param  {Function} next    async callback
 * @return {Object}   params  [description]
 */
function groupAchievementsByType(params, next){
	var achvmnts = params.res;
	var groupedAchvmnts = {};
	for(var achvmntId in achvmnts){
	  var type = achvmnts[achvmntId].type;
	  if(!!type){
	    groupedAchvmnts[type] = groupedAchvmnts[type] || {};
	    groupedAchvmnts[type][achvmntId] = achvmnts[achvmntId];
	  }
	}
	params.groupedAchievements = groupedAchvmnts;
	next(null, params);
}

/**
 * this function finds the one stable achievement for all types
 * @param  {[type]}   params [description]
 * @param  {Function} next   [description]
 * @return {[type]}          [description]
 */
function getAllCurrentAchvmnts(params, next){
	var freshAchvmnts = params.groupedAchievements;
	params.currentAchvmnts = {};
	for(var type in freshAchvmnts){
	  var achvmnts = freshAchvmnts[type];
	  var lockedstars = Number.MAX_VALUE;
	  var unlockedstars = Number.MAX_VALUE;
	  var lockedId 	 = null;
	  var unlockedId = null;

	  //get the max stars of the current type of achivements
	  var maxStars = Number.MIN_VALUE;
	  for(var achvmntId in achvmnts){
	  	if(achvmnts[achvmntId].stars > maxStars){
	  		maxStars = achvmnts[achvmntId].stars;
	  	}
	  }

	  for(var achvmntId in achvmnts){
	  	var subAchvmnt = achvmnts[achvmntId];
	    if(!subAchvmnt.isUnlock && subAchvmnt.stars < lockedstars){  //In case the achievement is still locked
	    	lockedstars = subAchvmnt.stars
	    	lockedId = achvmntId;
	    }
	    if(subAchvmnt.isUnlock && ((!subAchvmnt.isCollect && subAchvmnt.stars <= unlockedstars) || (subAchvmnt.isCollect && subAchvmnt.stars == maxStars))){
	    	unlockedstars = subAchvmnt.stars
	    	unlockedId = achvmntId;
	    }
	  }
	  if(unlockedstars < lockedstars){
	  	params.currentAchvmnts[unlockedId] = achvmnts[unlockedId];
	  	params.currentAchvmnts[unlockedId].totalB = percentHelper(achvmnts, achvmnts[unlockedId].stars);
	  }else{
	  	params.currentAchvmnts[lockedId] = achvmnts[lockedId];
	  	params.currentAchvmnts[lockedId].totalB = percentHelper(achvmnts, achvmnts[lockedId].stars)
	  }
	}
	next(null, params);
}

/**
 * this function returns the sum of total field for all achievement having stars less than the given stars
 * @param  {Object} achievements  object containing achievements
 * @param  {Number} stars         stars of the current achvmnt
 * @return {Number} sum           sum of total of all achievements having stars less than the given stars
 */
function percentHelper(achievements, stars){
	var sum = 0;
	for(var achvmntId in achievements){
		if(achievements[achvmntId].stars < stars){
			sum = sum + achievements[achvmntId].total;
		}
	}
	return sum;
}


/**
 * this decrements the stars if percentCompleted is not 100 else do nothing
 * @param  {Object}   params  achievements details
 * @param  {Function} next    async callback
 * @return {Object}   params  achievements details
 */
function adjustStarsOfAchievements(params, next){
	var achvmnts = 	params.currentAchvmnts;
	for(var achvmntId in achvmnts){
		if(achvmnts[achvmntId].percentCompleted < 100){
			achvmnts[achvmntId].stars = achvmnts[achvmntId].stars - 1;
		}
		if(achvmnts[achvmntId].percentCompleted == 100 && oneTimeAchievements.indexOf(achvmnts[achvmntId].type) >= 0){
			achvmnts[achvmntId].stars = 3;
		}
		// console.log(achvmnts[achvmntId],"-------------------------------");
	}
	next(null, params);
}

/**
 * this function returns updated achievement for the user who has just claimed one of its achievements
 * @param  {Object}   data 	must contain type of achievement
 * @param  {Function} cb   [description]
 * @return {[type]}        [description]
 */
function getUpdateAchievement(params, cb){
	var findData = {
		query: { type: params.data.type },
		sort:{},
		limit:0
	};
	params.app.rpc.logic.achievementRemote.find(params.session, findData, function(res){
		if(res.success){
			params.allAchieventList = res.data;
			async.waterfall([
				async.apply(allUnlockAchieventList, params),
				allUserAchieventList,
				groupAchievementsByType,
				getAllCurrentAchvmnts,
				calculatePercentageCompleted,
				adjustStarsOfAchievements]
				,function(err, res){
					if(err){
						cb({success: false, code: 409, msg: 'Unable to process request'});
					}else{
						var achivement = {};
						for(var id in res.currentAchvmnts){
							achivement = res.currentAchvmnts[id];
							achivement['achievementId'] = id;
						}
						cb({success: true, code: 200, data: achivement});
					}
				}
			)
		}else{
			cb({success: false, code: 409, msg: 'Unable to process request'});
		}
	});	
}