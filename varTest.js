/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-02-23 10:29:16
* @Last Modified by:   noor
* @Last Modified time: 2017-03-31 16:54:39
*/

'use strict';


var test = setTimeout(function(){
	console.log("-----------setTimeout-1 called---------");
},0);

console.log("before setTimeout");
var test = setTimeout(function(){
	console.log("-----------setTimeout-2 called---------");
},0);
console.log("after setTimeout");

console.log("before loop");
for(var i=0; i<1000000000; i++){

}
console.log("after loop");