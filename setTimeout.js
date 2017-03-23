/*
* @Author: csdevu
* @Date:   2017-02-09 16:50:33
* @Last Modified by:   noor
* @Last Modified time: 2017-02-15 10:35:01
*/
var obj = {
	name:"noor",
	show:function(){
		console.log("inside show function");
		console.log(this.name);
	}
}
this.name="ansari";
var borrowed = obj.show.bind(obj)
setTimeout(borrowed,2000);

(function(){
	console.log("this is a test of setTimeout-1 sec");
	setTimeout(obj.show,1000);
})();