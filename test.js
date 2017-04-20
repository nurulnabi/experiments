/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-02-09 18:05:28
* @Last Modified by:   noor
* @Last Modified time: 2017-04-20 13:20:24
*/

var nobj = {
	a:1
}

var obj = {
	1:2,
	name:"noor",
	obj:nobj
};


console.log(obj.name);
var a = obj.obj;
console.log(a);
obj = null;
console.log(obj);
console.log(a);
a = null;
console.log(nobj,a);