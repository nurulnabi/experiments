/*
* @Author: noor
* @Date:   2017-05-26 14:40:44
* @Last Modified by:   noor
* @Last Modified time: 2017-05-26 15:06:01
*/

var ctr = (function(){
	var _name = 'noor';
	var _setName = function(str){ _name = str; };

	return function(){
		this.getName = function(){ return _name; };
		this.setName = function(str){ _setName(str); };
	}
})();

var obj = new ctr();
console.log(obj.getName());
obj.setName('ansari');
console.log(obj.getName());

var obj2 = new ctr();
console.log(obj2.getName());