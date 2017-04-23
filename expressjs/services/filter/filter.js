/*
* @Author: noor
* @Date:   2017-04-20 18:13:47
* @Last Modified by:   nurulnabi
* @Last Modified time: 2017-04-23 18:40:34
*/

module.exports = function(){
	return new filter();
}

var filter = function(){
};

filter.prototype.plugUserId = function(req, res, next){
	console.log(req.body);

	var token = req.body ? req.body.token : null;
	if(!token){
		console.log("user is not logged in, Disconnecting it from the server");
		next(new Error("Unauthorized Access Denied"));
	}else{
		var sessionService = this.sessionService;
		var session = sessionService.getByUid(token);
		if(!session){
			console.log("unauthorized access");
			next(new Error("Unauthorized Access Denied"));
		}else{
			req.body.userId = session.getUserId();
			console.log("inserting the userId: ", req.body.userId);
			next();
		}
	}
}