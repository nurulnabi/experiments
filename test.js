/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-02-09 18:05:28
* @Last Modified by:   noor
* @Last Modified time: 2017-03-01 16:31:18
*/

// var lib = require('./lib');

// var desig = "senior software developer";

// lib(function(){
// 	console.log(desig)
// 	console.log("inside test.js");
// })


var getObj = require('./fsLoop');
var names = [
		"a","b","c","d"
	];

function ramu(){
	// getObj(names, function(res){
	// 	console.log(res);
	// })
	getObj().then(function(p){
		p.forEach(function(pp){
			console.log(pp);
		})
	})
}

ramu();