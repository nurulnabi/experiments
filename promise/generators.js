/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-02-28 12:29:51
* @Last Modified by:   noor
* @Last Modified time: 2017-05-15 19:03:09
*/

'use strict';
var fs = require('fs');

/**
 * [*readFile description]
 * @method      *readFile
 * @constructor
 * @author 		noor
 * @param       {Object}  app           pomelo    app object
 * @param       {[type]}  file          [description]
 * @yield       {[type]}  [description]
 */
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