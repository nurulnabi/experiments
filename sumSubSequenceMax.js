/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-02-17 12:14:11
* @Last Modified by:   noor
* @Last Modified time: 2017-02-17 12:35:23
*/

var seq = [1,-2,-3,-4,-5,-3,4,5,6];
var subSeq = [0,0,0];
var sum = 0;
for(var i=0; i<seq.length; i++){
	sum = 0;
	for(var j=i; j<seq.length; j++){
		sum = sum+seq[j];
		if(sum>subSeq[2]){
			subSeq[0]=i;
			subSeq[1]=j;
			subSeq[2]=sum;
		}
	}
}

console.log(subSeq);