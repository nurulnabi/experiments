/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-02-28 10:27:30
* @Last Modified by:   noor
* @Last Modified time: 2017-02-28 15:16:08
*/

var pages = [
		"a.json",
		"b.json",
		"inde.html",
		"c.json",
	];
var fs = require('fs');

function readJson(page){
	console.log("this file name is:",page);
	return new Promise(function(resolve,reject){
		fs.readFile("./"+page,"utf8",function(err,res){
			if(err){
				reject(err);
			}else{
				try {
				    resolve(JSON.parse(res));
				} catch (ex) {
				    reject(ex);
				}
			}
		});
	});
}

function readAll(pages){
	return Promise.all(pages.map(readJson));
}

/*function readAll(pages) {
    return Promise.all(pages.map(readJson).map(p => p.catch(e => new Error(e))))
        .then(results => results);
}

readAll(pages).then(function (allPages) {
    allPages.forEach(function (page) {
        if (page instanceof Error) {
            console.log("-----------------------------------------------");
            console.log(page);
        } else {
            console.log("++++++++++++++++++++++++++++++++++++++++++");
            console.log(page);
        }
    });
})*/

readAll(pages).then(function(allPages){
	allPages.forEach(function(page){
		console.log("++++++++++++++++++++++++++++++++++++++++++");
		console.log(page);
	});
})
.catch(function(err){
	console.log("-----------------------------------------------");
	console.log(err);
})



/*readJson('./a.json').then(function(json){
	console.log("inside then");
	console.log(json);
	return "noor"
})
.then(function(val){
	console.log("this is after the first then:",val);
	return new Promise(function(resolve, reject){
		reject(JSON.stringify({"name":"noorul"}));
	});
})
.then(function(val){
	console.log("third then with value:",val);
})
.catch(function(err){
	console.log("after promise catch");
	console.log(err)
})*/