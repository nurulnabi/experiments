/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-03-01 15:30:16
* @Last Modified by:   noor
* @Last Modified time: 2017-03-01 16:58:50
*/

var fs = require('fs');
var tmp=[];
var names = [
		"a","b","c","d"
	];
var idx = [1,2,3,4,5,6];
var powerP = function(){
	for(var key in names){
		if(names[key] == "b"){
			tmp[key] = new Promise(function(resolve, reject){
				fs.readFile("./timeout.js", "utf8", function(err, res){
					if(err){
						reject(err);
					}else{
						resolve(JSON.parse(res))
					}
				});
			});
		}else{
			tmp[key] = Promise.resolve(key); 
		}
	}

	Promise.all(tmp).then(function(p){
		console.log(p);
	})

	console.log("+++++++++++++++++++++++++++");
	// return Promise.all(tmp)
}

// powerP().then(p => console.log(p))

powerP()
module.exports = powerP;