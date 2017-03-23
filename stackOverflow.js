/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-02-17 16:38:04
* @Last Modified by:   noor
* @Last Modified time: 2017-02-17 17:10:31
*/



function dump(){
	function bump(){
		return "noor";
	}

	dump.bump = bump;
}
console.log(typeof dump);
console.log("noor");