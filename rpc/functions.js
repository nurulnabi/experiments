/*
* @Author: nurulnabi
* @Date:   2017-04-22 13:50:18
* @Last Modified by:   nurulnabi
* @Last Modified time: 2017-04-22 13:56:49
*/

module.exports = {

get : function(next){
	next("NOOR");
},

square: function(a, next){
	next(a*a);
}

}