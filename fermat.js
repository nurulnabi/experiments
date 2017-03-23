/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-02-20 19:27:42
* @Last Modified by:   noor
* @Last Modified time: 2017-02-20 19:49:34
*/

function getPower(m,n){
	var val=1;
	var count=0;
	for(var i=1; i<=n; i++){
		val = val*m;
		count++;
	}
	console.log(count,val);
	return val;
}

var m = parseInt(process.argv[2]);
var n = parseInt(process.argv[3]);
console.log((getPower(n,m)-n)%m);

