var allFunctions = function(){ };

var allFunctionsProto = allFunctions.prototype;

allFunctionsProto.getJSONFile = function(fileName){ 
	var that = this;	//use 'that' instead of 'this'
	//code to fetch json file
};


allFunctionsProto.calculateInterest = function(price){
	var that = this;	//use 'that' instead of 'this'
	//code to calculate interest
};

allFunctionsProto.sendResponse = function(data){
	var that = this;	//use 'that' instead of 'this'
	//code to send response
};


//similary write all of your functions here using "allFunctionsProto.<yourFunctionName>"


module.exports = new allFunctions();

