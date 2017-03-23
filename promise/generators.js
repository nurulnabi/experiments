/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-02-28 12:29:51
* @Last Modified by:   noor
* @Last Modified time: 2017-02-28 14:27:57
*/

'use strict';
var fs = require('fs');

function* readFile(file){
	console.log("inside the generator function");
	var valOfPromise = yield new Promise(function(resolve,reject){
		fs.readFile("./"+file,'utf8',function(err,res){
			if(err){
				reject(err);
			}else{
				resolve(res);
			}
		})
	});

	setTimeout(function(valOfPromise){
		console.log(valOfPromise+"-----------------");
	},5000,valOfPromise)
}

var iter = readFile('a.json');
console.log(iter.next());
console.log(iter.next());