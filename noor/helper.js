/**
 *  0.1
 *  Helper, Helper fucntion which commonly used
 *
 *  @ CreatioSoft All Rights Reserved.
 *  Date: 1 Dec, 2016
 *  programmer: Pankaj Jatav <pankaj@creatiosoft.com>
 *  Javascript file helper.js
 */

"use strict";
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Friends = mongoose.model('Friends');
var Invites = mongoose.model('Invites');
var Channel = mongoose.model('Channel');
var BestTime = mongoose.model('BestTime');
var Achievements = mongoose.model("Achievements");
var UnlockAchievements = mongoose.model('UnlockAchievements');
var bots = require('undot')('../shared/bots.json');
var config = require('undot')('../shared/config/config.json');

var Helper = function() {
}

/**
*
* Call to get the rank of the player
* 
* @param  cb     callback take the response form the fuction
* @param  userid String   Id of the user
* 
* @return  rank of the player
*
*/
Helper.prototype.rank = function (userid, cb) {
  User.findOne({
    _id: userid
  }, function(err, user) {
    if (err || !user) {
      cb({success: false, code: 409, msg: 'Unable to process request.'});
    }
    User.count({wins: {$gte: user.wins}}, function(err, rank) {
      if (err) {
        cb({success: false, code: 409, msg: 'Unable to process request.'});
      }
      var res = {
        id: user._id,
        rank: rank,
        name : user.name,
        wins: user.wins,
        percentWin: user.percentWin,
        imageUrl: user.imageUrl
      }
      cb({success: true, code: 200, msg: 'Rank find successfully.', data: res});
    });
  });
}

/**
*
* Call to get user pending friend request count
* 
* @param  cb     callback take the response from the function
* @param  userid String   Id of the user
* 
* @return pending friend request count data in callback
*
*/
Helper.prototype.pendingRequestCount = function(userid, cb) {
  Friends.count({
    friend: userid,
    status: config.requestStatus.pending
  }, function(err, count){
    if (err) {
      cb({success: false, code: 409, msg: 'Unable to process request.'});
    } else {
      cb({success: true, code: 200, msg: 'pendingRequestCount found successfully.', data: count});
    }
  })
}

/**
*
* Call to get user pending game invite request count
* 
* @param  cb     callback take the response from the function
* @param  userid String   Id of the user
* 
* @return pending game invite request count data in callback
*
*/
Helper.prototype.pendingGameInviteCount = function(userid, cb) {
  Invites.count({
    friend: userid,
    status: config.requestStatus.pending,
    mode:"online"
  }, function(err, count){
    if (err) {
      cb({success: false, code: 409, msg: 'Unable to process request.'});
    } else {
      cb({success: true, code: 200, msg: 'pendingGameInviteCount found successfully.', data: count});
    };
  })
};

/**
*
* Call to delete all channels :: should be used at time of server start
* 
* @param  cb         callback take the response form the fuction
* @data   channelId  string   Id of the channel
* 
* @return  status of doc delete in callback
*
*/
Helper.prototype.deleteAllChannels = function(cb) {
  Channel.remove({}, function(err,res) {
    if (err) {
      cb({success: false, code: 409, msg: 'Unable to process request.'});
    } else {
      cb({success: true, code: 200, msg: 'Channels deleted successfully.'});
    };
  })
};

/**
*
* Call to delete all invites :: should be used at time of server start
* 
* @param  cb         callback take the response form the fuction
* @data   channelId  string   Id of the channel
* 
* @return  status of doc delete in callback
*
*/
Helper.prototype.deleteAllInvites = function(cb) {
  Invites.remove({}, function(err,res) {
    if (err) {
      cb({success: false, code: 409, msg: 'Unable to process request.'});
    } else {
      cb({success: true, code: 200, msg: 'Invites deleted successfully.'});
    };
  })
};

/**
 * to add count of pending invites to every join channel response: EXCLUSIVE
 * @param object   inputData  input data to join channel
 * @param object   resData    response for join channel
 * @param Function cb         callback for response
 *
 * @return returned response to callback
 */
Helper.prototype.addCountToJoinChannel = function(inputData, resData, cb) {
  var that = this;
  if (resData.success || ((!resData.success) && resData.code==410)) {
    // count "pendingGameInviteCount"
    that.pendingGameInviteCount(inputData.playerId, function(result) {
      if (result.success) {
        var pendingGameInviteCountTemp = inputData.noCreateRoom? (((result.data>=1)  && resData.success)? (result.data-1): result.data) : result.data;
        //why minus one? : 
      } else{
        //one in millions case
        var pendingGameInviteCountTemp = 0;
      };
      resData.data = resData.data || {};
      resData.data.pendingGameInviteCount = pendingGameInviteCountTemp;
      resData.pendingGameInviteCount = pendingGameInviteCountTemp;
      cb(resData);
    })
  } else{
    cb(resData);
  };
};


/**
*
* Call to delete all invites :: should be used at time of server start
* 
* @param  cb         callback take the response form the fuction
* @data   channelId  string   Id of the channel
* 
* @return  status of doc delete in callback
*
*/
Helper.prototype.setBots = function(app) {
  app.bots = {
    free: [],
    busy: []
  }
  User.find({isBot:true}, function(err,res){
    if(err){
      console.log('Error Occur while pushing bots');
    } else {
      if(res.length){
        res.map(function(bot){
          app.bots.free.push(bot._id.toString());
        });
      } else {
          var user = {};
          bots.map(function(bot){
            user.name = bot.name;
            user.email = user.name+'@cowboy.com';
            user.password = 'cowboy123bot';
            user.isBot = true
            User.create(user,function(err,res){
              if(err){
                console.log('Unable to create bot',err);
              } else {
                app.bots.free.push(res._id);
              }
            });
          });
      };
        console.log(app.bots);
    }
  });
}

/**
 * update the specified field of the user document
 * @param  {ObjectId}   userId userId of the user to be updateed
 * @param  {object}   data   Object containing the data to be updated
 * @param  {Function} next   callback function
 * @return {reponse}          callback with the update response
 */
Helper.prototype.updateUser = function(userId, data){
  var updateData = {};
  for(var key in data){
    if(data[key] !== undefined){
      updateData[key] = data[key];
    }
  }
  var conditionQuery  = { _id:userId };
  
return new Promise(function(resolve, reject){
    User.update({ uuid: data.uuid }, {$set:{ registrationId: null }}, { multi: true })
    .exec().then(function(res){
      User.findOne(conditionQuery,function(err, doc){
        if(!err){
          for(var key in updateData){
            doc[key] = updateData[key];
          }
          doc.save(function(err, res){
            if(!err){
              resolve(res);
            }else{
              reject(err);
            }
          });
        }else{
          reject(err);
        }
      });
    }).catch(function(err){
      reject(JSON.Stringify(err));
    })
  });
};

/**
 * this will update the bestTime of the player for a particular theme
 * @param  {object} data      has playerId, theme, bestTime as its key/value pair
 * @return {Object} promise   returns promise to work with 
 */
Helper.prototype.updateBestTime = function(data){
  return new Promise(function(resolve, reject){
    BestTime.findOne({ playerId:data.playerId, theme:data.theme }, function(err, doc){
      if(err){
        reject({ success:false, code:400, msg:"Unable to process"});
      }else if(!doc){ //if no document found
        BestTime.create(data,function(err, res){
          if(err){
            reject({ success:false, code:400, msg:"Unable to process"});
          }else{
            resolve({ success:true, code:200, msg:"Best Time Inserted", data:res});
          }
        });
      }else{  //if document found
        if(doc.bestTime > data.bestTime){
          BestTime.update({ playerId:data.playerId, theme:data.theme }, {bestTime: data.bestTime }, function(err, res){
            if(err){
              reject({ success:false, code:400, msg:"Unable to process", data:err});
            }else{
              resolve({ success:true, code:200, msg:"Best Time Inserted", data:res});
            }
          });
        }else{
          resolve({ success:true, code:200, msg:"Best Time Inserted", data:doc});
        }
      }
    });
  });
};

/**
 * get the bestTime of the specific player in particular format(data must contain that theme) or in all format(only playerId required)
 * @param  {Object}   data        playerId and theme of the player whose bestTime has to be found
 * @return {Object}   promise     promise to resolve or reject
 */
Helper.prototype.getBestTime = function(data){
  var queryData = {};
  if(!data.theme){
    queryData['playerId'] = data.playerId; 
  }else{
    queryData = data;
  }
  return new Promise(function(resolve, reject){
    BestTime.find(queryData, function(err, docs){
      if(err){
        reject({ success:false, code:400, msg:"Unable to find BestTime"});
      }else if(docs.length == 0){ //this user has not won this game yet
        data.bestTime = 0;
        if(!data.theme){  //if queried for bestTime in all format
          resolve(docs);
        }
        resolve(data);
      }else{
        if(!data.theme){  //if queried for bestTime in all format
          resolve(docs);
        }
        resolve(docs[0]);
      }
    });
  });
};

/**
 * this function returns the total friends of a particular user by playerId
 * @param  {Object} data      contains playerId
 * @return {Object} promise   settled promise
 */
Helper.prototype.getFriendsCount = function(data){
  return new Promise(function(resolve, reject){
    Friends.count({ user: data.playerId, status: 1}, function(err, count){
      if(err){
        reject({ success: false, code:400, msg:JSON.stringify(err)});
      }else{
        resolve(count);
      }
    });
  });
}

/**
 * this will increase the totalFriendsAdded of a particular user
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
Helper.prototype.incrementFriendsCount = function(data){
  return new Promise(function(resolve, reject){
    User.findByIdAndUpdate(data.playerId, { $inc : { totalFriendsAdded: 1 }}, function(err, doc){
      if(err){
          reject(JSON.stringify(err));
      }else{
          resolve(doc.totalFriendsAdded+1);
      }
    });
  });
}

/**
 * this will convert the time in ms to mm:ss:ms format
 * @param  {int}    bestTime  time in miliseconds
 * @return {string}     time      time in mm:ss:ms format
 */
Helper.prototype.timeFormatter = function(bestTime){
  var min, sec, ms;
  ms              = bestTime%1000;
  bestTime        = Math.abs(Math.floor((bestTime-ms)/1000));
  sec             = bestTime > 60 ? bestTime%60 : bestTime;
  min             = Math.abs(Math.floor((bestTime-sec)/60));
  return min+":"+sec+":"+ms;
}

Helper.prototype.getAllAchivementsByType = function(){
  return Achievements.aggregate([
      { 
        $group:{
          "_id": "$type"
        }
      },
      {
          $project:{ type: "$_id", _id:0 }
      },
      {
        $sort:{type:1}
      }
    ]).exec();
}

Helper.prototype.getKeyValPairForUser = function(playerId, data){
  return new Promise(function(resolve, reject){
    User.findOne({ _id: playerId }, function(err, doc){
      if(!err){
        var result = data.reduce(function(memo, val){
          memo[val] = doc[val];
          return memo;
        }, {});
        result['id'] = doc._id;
        resolve(result);
      }else{
        reject({success: false, code:400, msg:err });
      }
    });
  });
} 


Helper.prototype.getLockedUnlockedAchvmnts = function(params){
  var findLocked =  {
    query: {
      type:params.type
    },
    sort:{},
    limit:0
  }
  return new Promise(function(resolve, reject){
    params.app.rpc.logic.achievementRemote.find(params.session, findLocked, function(resLock){
      if(resLock.success){
        console.log(resLock,"+++++++++resLock++++++++++++++++++");
        var _ids = resLock.data.map(function(achvmnt){
            return achvmnt._id;
          });
          console.log(_ids,"****_ids______________");
          var findData =  {
            query: {
              achievementId:{ $in: _ids}, playerId:params.playerId
            },
            sort:{},
            limit:1
          }
          params.app.rpc.logic.achievementRemote.findUnlock(params.session, findData, function(resUnlock){
            if(resUnlock.success){
               var data = {};
               data.allLockedAchvmnt = resLock.data;
               data.allUnlckdAchvmnt = resUnlock.data;
               // console.log(data,"&&&&&&&&&&&&&&&&&&&&Resolve getLockedUnlockedAchvmnts&&&&&&&&&&&&");
               resolve(data);
            }else{
              // console.log(data,"&&&&&&&&&&&&&&&&&&&&reject getLockedUnlockedAchvmnts&&&&&&&&&&&&");
              reject(resUnlock);
            }
          });
      }else{
        // console.log(data,"&&&&&&&&&&&&&&&&&&&&reject getLockedUnlockedAchvmnts&&&&&&&&&&&&");
        reject(resLock);
      }
    });
  })
}

module.exports = Helper;