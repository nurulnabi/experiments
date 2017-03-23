var obj = {
	name:"noor",
	age:23
}

var desig = "software developer";

module.exports = function(next){
	console.log("inside lib.js");
	next();
}