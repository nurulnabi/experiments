/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-02-16 13:09:39
* @Last Modified by:   noor
* @Last Modified time: 2017-02-16 13:23:26
*/

'use strict';

var setTime= {time:0};
var clrIt = {time:0}

var intervalFn = function(tme,clrMe){
	console.log("checking: ",tme.time);
	if(tme.time == 5000)
		clearInterval(clrMe.time);
};


clrIt.time = setInterval(intervalFn,100,setTime,clrIt);

for(var i=0; i<=5000; i++){
	setTime.time = i; 
	console.log(setTime.time);
}