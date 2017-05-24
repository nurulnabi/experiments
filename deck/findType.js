/*
* @Author: noor
* @Date:   2017-05-22 15:59:22
* @Last Modified by:   noor
* @Last Modified time: 2017-05-24 10:24:04
*/

var handObject = require('./handGenerator.js');
var hands = require('./hands3');
var deck = require('./deck');
var _ 	 = require('underscore');

function getCards(resultObj, nameString, isSameSuit, isInSeq, isRF){
	var resObj = {};
	if(isSameSuit && isInSeq){
		if(isRF == 5){
			resObj.handInfo  = { type: "Royal Flush", strength: 10 };
			resObj.cards = handObject.cardsFromHandType[resObj.handInfo.type.toLowerCase()](resultObj, nameString);
		}else{
			resObj.handInfo  = { type: "Straight Flush", strength: 9 };
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
	var suit = {};
	var result = { };
	var isInSeq = false;
	var isSameSuit   = false;
	var RF = { "A":true, "K":true, "Q":true, "J":true, "10":true };		//checks for royal flush
	var rf = 0;	//count for royal flush cards
	var seq = 1;	//check for sequence
	var tester = set[0].rank
	// console.log(suit);
	for(var card of set){
		if(result[card.name] == undefined){
			result[card.name] = {count:1, cards:[card]}
		}else{
			result[card.name].count++;
			result[card.name].cards.push(card);
		}

		//checks suit
		if(suit[card.type]){
			suit[card.type]++;
		}else{
			suit[card.type] = 1;
		}
		//checks royal flush
		if(RF[card.name]){
			delete RF[card.name];
			rf++;
		}
		//checks sequence
		if(card.rank == tester+1){
			seq++;
			tester = card.rank;
		}else{
			if(seq < 5 && card.rank != tester){
				seq = 1;
				tester = card.rank
			}
		}
	}
	var nameString = '';
	var nameStr 	   = ''
	for(var name in result){
		nameStr    = nameStr+name; 
		nameString = nameString+result[name].count;
	}
	//checks if any suit has five cards in this set
	for(var type in suit){
		if(suit[type] >= 5){
			isSameSuit = true;
			break;
		}
	}
	//checks if any five or more cards are in sequence
	if(rf == 5 || seq >= 5){
		isInSeq = true;
	}

	console.log(nameString, nameStr);
	console.log(rf, isSameSuit, isInSeq, nameString, seq, suit);
	return getCards(result, nameString, isSameSuit, isInSeq, rf);
}

// var set = deck.getRandomCards(7);
// var data = assignType(set)
// console.log("===============set===================");
// console.log(set);
// console.log("===============cards===================");
// console.log((data.cards));
// console.log("===============type===================");
// console.log((data.type));


// for(var set of hands){
// 	var data = assignType(set)
// 	// console.log("===============set===================");
// 	// console.log(set);
// 	console.log("===============cards===================");
// 	console.log((data.cards));
// 	console.log("===============type===================");
// 	console.log((data.handInfo));
// 	console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
// 	// console.log(set.length);
// }

for(var hand of hands){
  var set = _.sortBy(hand, "rank")
  var data = assignType(set);
  var name = '';
  for(var card of data.cards){
  	name = name+card.name;
  }
  // console.log(data.handInfo, !!name && name.length >= 5 ? name :"####" );
  // console.log("+++++++++++++++++++++++");
  console.log(data.cards);
	
}
