/*
* @Author: noor
* @Date:   2017-04-28 17:06:21
* @Last Modified by:   noor
* @Last Modified time: 2017-04-28 18:47:37
*/


var response = require('./responseManager.js');

var successMessage = {
	loginSuccess:"Login Successful"
};

var failMessage = {
	pwdChangeRequired:"Found sucpicious activity change your password first",
	accountLocked:"Your Account has been lockeds",
	sucpiciousActivity:"Your Activity is Supicious will Be Reported"
};







module.exports =  (function(){
	var responseData = {};
	for(var key in successMessage){
		var res = new response();
		responseData[key] = res.getSuccess(key, successMessage);
	}
	for(var key in failMessage){
		var res = new response();
		responseData[key] = res.getFailure(key, failMessage);
	}
	return responseData;
})();