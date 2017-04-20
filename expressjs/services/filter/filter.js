/*
* @Author: noor
* @Date:   2017-04-20 18:13:47
* @Last Modified by:   noor
* @Last Modified time: 2017-04-20 19:27:40
*/

module.exports = function(){
	return new filter();
}

var filter = function(){
};

filter.prototype.plugUserId = function(req, res, next){
	var token = req.body ? req.body.token : null;
	if(!token){
		console.log("user is not logged in");
		next();
	}else{
		var sessionService = this.sessionService;
		var session = sessionService.getByUid(token);
		req.body.userId = session.getUserId();
		console.log("inserting the userId: ", req.body.userId);
		next();
	}
}