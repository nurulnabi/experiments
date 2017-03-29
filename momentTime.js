/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-03-24 13:17:26
* @Last Modified by:   noor
* @Last Modified time: 2017-03-24 14:44:44
*/

var moment = require('moment');

var bt = moment.duration(86400000);

var allDate = bt._data;

var getTime = function(str){
	var time = '';
	var strMapping = {
		hh:"hours",
		mm:"minutes",
		ss:"seconds",
		ms:"milliseconds",
		DD:"days",
		MM:"months",
		YY:"years"
	};
	var strArr = str.split(':');
	var status = false;
	for(var frmt of strArr){
		var tt = strMapping[frmt];
		if(!tt){
			time = getDefault()+":";
			break;
		}else{
			status = allDate[tt] ? false : true;
			time = time+allDate[tt]+':';
		}
	}

	function getDefault(){
		return allDate['minutes']+":"+allDate['seconds']+":"+allDate['milliseconds'];
	}

	console.log(status);
	if(status){

	}
	return time.slice(0,-1);
};

console.log(getTime("hh:mm:ss"));