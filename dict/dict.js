/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-02-16 16:16:21
* @Last Modified by:   noor
* @Last Modified time: 2017-02-16 19:03:31
*/

var objArray = function(str){
	this.arr = str.split('') || [];
}

objArray.prototype.make = function(){
	var leftArr = this.getLeft()  || [];
	var rightArr = this.geRight() || [];
	var subArr = [rightArr[0]+leftArr[1],leftArr[1]+rightArr[0]];
	var tempArr = [];
	var result = leftArr.map(function(elem){
		
	});
	return subArr;
};

objArray.prototype.getLeft = function(){
	var len = this.arr.length;
	return this.arr.splice(0,len-2);
};

objArray.prototype.geRight = function(){
	var len = this.arr.length;
	return this.arr.splice(len-2);
}

objArray.prototype.joinAll = function(b){
	var jn = [a.slice(0, position), b, a.slice(position)].join('');
}

var arr = new objArray("abcd");

console.log(arr.make());
