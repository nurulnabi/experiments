/*
* @Author: noor
* @Date:   2017-05-22 15:59:22
* @Last Modified by:   noor
* @Last Modified time: 2017-05-22 18:36:01
*/

var handObject = require('./handGenerator.js');
var deck = require('./deck');

function getCards(resultObj, nameString, isSameSuit, isInSeq){
	var resObj = {};
	if(isSameSuit && isInSeq){
		resObj.type  = "Royal Flush";
		resObj.cards = handObject.cardsFromHandType[resObj.type.toLowerCase()](resultObj, nameString);
	}else if(isSameSuit && !isInSeq){
		resObj.type  = "Flush";
		resObj.cards =  handObject.cardsFromHandType[resObj.type.toLowerCase()](resultObj, nameString);
	}else if(!isSameSuit && isInSeq){
		resObj.type  = "Straight";
		resObj.cards = handObject.cardsFromHandType[resObj.type.toLowerCase()](resultObj, nameString);
	}else{
		resObj.type  = handObject.memoOfHandTypes[nameString];
		resObj.cards = handObject.cardsFromHandType[resObj.type.toLowerCase()](resultObj, nameString);
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
			result[card.name] = {count:1, card:card}
		}else{
			result[card.name].count++;
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
	return getCards(resultObj, nameString, isSameSuit, isInSeq);
	// return {strength:handObject.memoOfHandTypes[nameString], cards:handObject.cardsFromHandType[set.strength.toLowerCase()](result, nameString), set:set } ;

}

var set = deck.getRandomCards(7);
var data = assignType(set)
console.log(data.set);
console.log((data.cards));
console.log((data.strength));