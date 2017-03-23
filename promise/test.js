/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-02-28 16:41:45
* @Last Modified by:   noor
* @Last Modified time: 2017-03-22 18:43:01
*/


var firstPromise = function(n){
	for(var i=0; i<n; i++){
		if(i==300){
			if(firstPromise(-500)){
				return "ansari";
			}else{
				return null;
			}
		}
	}
	return "md";
};

// console.log(firstPromise(500));
// 

var obj = {
	name:"noor",
	age:23
}
for(var i=0; i<5; i++){
	obj[i] = i;
}
obj['karma'] = "karma"

console.log(obj);