
var fs = require('fs');

var callback = function(){
	  console.log("callback called");
	var startCallback = Date.now();

  // do something that will take 100ms...
  while (Date.now() - startCallback <= 100) {
    ; // do nothing
  }
}

function someAsyncOperation (callback) {
  console.log("inside someAsyncOperation");
  var startCallback = Date.now();

  // do something that will take 10ms...
  while (Date.now() - startCallback <= 100) {
    ; // do nothing
  }

  callback(); 
}

function sifn(){
	var delay = Date.now() - timeoutScheduled;
  	console.log(delay + " this is setImmediate");
}

someAsyncOperation(callback);

var timeoutScheduled = Date.now();

setImmediate(sifn);
setTimeout(function(){
	console.log("this is setTimeout");
},0);

callback();
fs.readFile("./noor.txt",function(err,data){
	var delay = Date.now() - timeoutScheduled;
	console.log(delay + "file read");
});
