/*
* @Author: noor
* @Date:   2017-05-22 15:59:22
* @Last Modified by:   noor
* @Last Modified time: 2017-05-22 19:30:40
*/

var handObject = require('./handGenerator.js');
var hands = require('./hands');
var deck = require('./deck');

function getCards(resultObj, nameString, isSameSuit, isInSeq, isRF){
	var resObj = {};
	if(isSameSuit && isInSeq){
		if(isRF == 5){
			resObj.handInfo  = { type: "Royal Flush", strength:0 };
			resObj.cards = handObject.cardsFromHandType[resObj.handInfo.type.toLowerCase()](resultObj, nameString);
		}else{
			resObj.handInfo  = { type: "Straight Flush", strength:10 };
			resObj.cards = handObject.cardsFromHandType[resObj.handInfo.type.toLowerCase()](resultObj, nameString);
		}
	}else if(isSameSuit && !isInSeq){
		resObj.handInfo  = { type: "Flush", strength:6 };
		resObj.cards =  handObject.cardsFromHandType[resObj.handInfo.type.toLowerCase()](resultObj, nameString);
	}else if(!isSameSuit && isInSeq){
		resObj.handInfo  = { type: "Straight", strength: 5};
		resObj.cards = handObject.cardsFromHandType[resObj.handInfo.type.toLowerCase()](resultObj, nameString);
	}else{
		resObj.handInfo  = handObject.memoOfHandTypes[nameString];
		resObj.cards = handObject.cardsFromHandType[resObj.handInfo.type.toLowerCase()](resultObj, nameString);
	}
	return resObj;
}
var assignType = function(set){
	var result = {};
	var isAcePresent = false;
	var isInSeq = true;
	var isSameSuit   = true;
	var RF = { "A":true, "K":true, "Q":true, "J":true, "10":true };		//checks for royal flush
	var rf = 0;	//count for royal flush cards
	var seq = set[0].rank+1;	//check for sequence
	var suit  		 = set[0].type;	//checks for suit
	// console.log(suit);
	for(var card of set){
		if(result[card.name] == undefined){
			result[card.name] = {count:1, cards:[card]}
		}else{
			result[card.name].count++;
			result[card.name].cards.push(card);
		}

		if(card.type != suit){
			isSameSuit = false;
		}

		if(card.name == 'A'){
			isAcePresent = true;
		}

		if(RF[card.name]){
			delete RF[card.name];
			rf++;
		}

		if(seq == (card.rank+1)){
			seq++;
		}else{
			isInSeq = false;
		}
	}
	var nameString = '';
	for(var name in result){
		nameString = nameString+result[name].count;
	}

	console.log(nameString);
	if(rf == 5 && isSameSuit){
		set.strength = "Royal Flush";
	}else{
		if(rf == 5){
			isInSeq = true;
		}
	}
	return getCards(result, nameString, isSameSuit, isInSeq, rf);
	// return {strength:handObject.memoOfHandTypes[nameString], cards:handObject.cardsFromHandType[set.strength.toLowerCase()](result, nameString), set:set } ;

}

// var set = deck.getRandomCards(7);
// var data = assignType(set)
// console.log("===============set===================");
// console.log(set);
// console.log("===============cards===================");
// console.log((data.cards));
// console.log("===============type===================");
// console.log((data.type));


for(var set of hands){
	var data = assignType(set)
	// console.log("===============set===================");
	// console.log(set);
	console.log("===============cards===================");
	console.log((data.cards));
	console.log("===============type===================");
	console.log((data.handInfo));
	console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
	// console.log(set.length);
}