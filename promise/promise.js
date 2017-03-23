/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-02-27 18:51:51
* @Last Modified by:   noor
* @Last Modified time: 2017-03-02 11:47:15
*/

var fs = require('fs');
var pages = [
		"a.json",
		"b.json",
		"c.json",
	];
function readJSON(filename){
 return new Promise(function(resolve,reject){
 	fs.readFile("./"+filename, "utf8", function(err,res){
 		if(err)
 			reject(err);
 		else
 			resolve(JSON.parse(res));
 	});
 });
}

// readJSON('../timeout.js').then(function(res){
// 	console.log(res);
// 	console.log("resolved");
// },function(err){
// 	console.log(err);
// 	console.log("errored");
// 	return Promise.reject();
// })
// .then(function(res){
// 	console.log("Extra then");
// })
// .catch(function(err){
// 	console.log("this is second err");
// })

var data = [];
for(var p of pages){
	data.push(readJSON(p));
}

console.log(data);
Promise.all(data).then(function(res){
	res.forEach( a => console.log(a))
},function(err){
	console.log(err);
})