/*
* @Author: noor
* @Date:   2017-05-19 09:59:13
* @Last Modified by:   noor
* @Last Modified time: 2017-05-19 10:21:20
*/

var deck = require('./deck');
var getName = function(val, seq){
	switch(val){
		case 11111:
			return "All Different";
		case 41:
			return "Four of A Kind";
		case 14:
			return "Four of A Kind";
		case 32:
			return "Full House";
		case 23:
			return "Full House";
		case 113:
			return "Three of A Kind";
		case 131:
			return "Three of A Kind";
		case 311:
			return "Three of A Kind";
		case 221:
			return "Two Pair";
		case 212:
			return "Two Pair";
		case 122:
			return "Two Pair";
		case 2111:
			return "One Pair";
		case 1211:
			return "One Pair";
		case 1121:
			return "One Pair";
	}
}

var assignType = function(set){
	var result = {};
	for(var name of set){
		if(result[name.name] == undefined){
			result[name.name] = 1;
		}else{
			result[name.name]++;
		}
	}
	var nameString = '';
	for(var name in result){
		nameString = nameString+result[name];
	}

	console.log(nameString);
	set.strength = getName(parseInt(nameString, 10));
	return set;
}

console.log(assignType(deck.getRandomCards(5)));
