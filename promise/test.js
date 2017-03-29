/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-02-28 16:41:45
* @Last Modified by:   noor
* @Last Modified time: 2017-03-28 17:21:03
*/


var distribute = function(sum, pCount){
	var half = sum/2;
	var rest = Math.round(half/pCount);
	var obj = {};
	obj.usr = rest;
	obj.sys = sum-rest;
	return obj;
}