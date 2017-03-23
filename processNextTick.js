/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-02-15 11:36:53
* @Last Modified by:   noor
* @Last Modified time: 2017-02-15 11:42:32
*/

function fn1(next){
	console.log("this is fn1");
	var startCallback = Date.now();

  // do something that will take 10ms...
  while (Date.now() - startCallback <= 100) {
    ; // do nothing
  }
  process.nextTick(next);
}

function fn2() {
	console.log("this is fn2");
}

function fn3() {
	console.log("this is fn3");
}

function myfn() {
	console.log("this is myfn");
	var startCallback = Date.now();

  // do something that will take 10ms...
  while (Date.now() - startCallback <= 1000) {
    ; // do nothing
  }
}

function processNxt(next) {
	console.log("this is processNxt");
	process.nextTick(next,fn3);
}

console.log("==========================this is start==========================");
fn1(fn2);
myfn();
processNxt(fn1)
console.log("==========================this is end============================");