/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-02-17 17:26:11
* @Last Modified by:   noor
* @Last Modified time: 2017-02-17 17:52:15
*/


var nums = [1,2,3,4];

for(var i=0; i<nums.length; i++){
	var num = nums[i];
	var elem = document.createElement('div');
	elem.textContent = num;

	elem.addEventListener('click',(function(numCopy){
		return function(){ alert(numCopy) };
	})(num));

	document.getElementById("number").appendChild(elem);
}