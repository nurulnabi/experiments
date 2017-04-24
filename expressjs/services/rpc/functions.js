/*
* @Author: nurulnabi
* @Date:   2017-04-23 18:27:12
* @Last Modified by:   noor
* @Last Modified time: 2017-04-24 11:09:25
*/


module.exports = function(app){
	return new rpcFunctions(app);
}

var rpcFunctions = function(app){
	this.pushMessageByUids = function(data, signature, serverId, next){
		data = app.crypto.decrypt(data, signature, serverId);
		if(!data){
			next("Unable to authorize");
			return;
		};
		data = JSON.parse(data);
		if(!data.route || !data.data || !data.uids){
			next("Missing data");
			return;
		}
		var channelService = app.channelService;
		channelService.pushMessageByUids(data.route, data.data, data.uids);
		next(null, "data broadcasted successfully");
	};

	this.updatePublicKey = function(data, serverId, next){
		app.configData.publicKey[serverId] = data.key;
		next(null, "Key updated successfully");
	};
};