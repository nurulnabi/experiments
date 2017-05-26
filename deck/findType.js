/*
* @Author: noor
* @Date:   2017-05-22 15:59:22
* @Last Modified by:   noor
* @Last Modified time: 2017-05-26 15:34:15
*/

var handObject = require('./handGenerator.js');
var helper 	   = require('./helper');
// var handType   = require('./numToType');
// var hands = require('./hands3');
// var deck = require('./deck');
var _ 	 = require('underscore');

function getCards(params){
	params.hand = {};
	if(params.isSameSuit && params.isInSeqInSS){
		if(params.isRoyalFlushInSS){
			params.hand.handInfo  = { type: "Royal Flush", strength: 10 };
			params.hand.cards = handObject.cardsFromHandType[params.hand.handInfo.type.toLowerCase()](params.resultObj, params.nameString, params.sameSuitCards);
		}else{
			params.hand.handInfo  = { type: "Straight Flush", strength: 9 };
			params.hand.cards = handObject.cardsFromHandType[params.hand.handInfo.type.toLowerCase()](params.resultObj, params.nameString, params.sameSuitCards);
		}
	}else if(params.isSameSuit){
		params.hand.handInfo  = { type: "Flush", strength:6 };
		params.hand.cards =  handObject.cardsFromHandType[params.hand.handInfo.type.toLowerCase()](params.resultObj, params.nameString, params.sameSuitCards);
	}else if(params.isInSeq){
		params.hand.handInfo  = { type: "Straight", strength: 5};
		params.hand.cards = handObject.cardsFromHandType[params.hand.handInfo.type.toLowerCase()](params.resultObj, params.nameString);
	}else{
		params.hand.handInfo  = handObject.memoOfHandTypes[params.nameString];
		params.hand.cards = handObject.cardsFromHandType[params.hand.handInfo.type.toLowerCase()](params.resultObj, params.nameString);
	}
}

function checkSameSuit(params){
	var suit = params.suit;
	params.isSameSuit = false;
	params.sameSuitCards = [];
	for(var type in suit){
		if(helper.uniqObj(suit[type]).length >= 5){
			params.isSameSuit = true;
			params.sameSuitCards = suit[type];
			break;
		}
	}
}

function checkRFInSameSuit(params){
	var cards = params.sameSuitCards;
	params.isRoyalFlushInSS = helper.checkRF(cards);
	params.isInSeqInSS 		= cards.length >= 5 ? isCardsInSeq(cards) : false;
	params.isInSeqInSS 		= params.isRoyalFlushInSS || params.isInSeqInSS;
}

function checkDiffCardsInSeq(params, next){
	params.isInSeq = params.isInSeq || isCardsInSeq(params.set) ? true : false;
}

function isCardsInSeq(cards){
	var seq = 1;
	var tester = cards[0].rank;
	for(var card of cards){
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

	return seq >= 5 ? true : false;
}

var buildTypeString = function(params){
	var suit = {};
	var result = { };
	var RF = { "A":true, "K":true, "Q":true, "J":true, "10":true };		//checks for royal flush cards
	var rf = 0;	//count for royal flush cards
	// console.log(suit);
	params.nameStr    = ''; 
	for(var card of params.set){
		if(result[card.name] == undefined){
			result[card.name] = {count:1, cards:[card]}
		}else{
			result[card.name].count++;
			result[card.name].cards.push(card);
		}

		//checks suit
		if(suit[card.type]){
			suit[card.type].push(card);
		}else{
			suit[card.type] = [ card ];
		}
		//checks royal flush cards
		if(RF[card.name]){
			delete RF[card.name];
			rf++;
		}
		params.nameStr = params.nameStr+card.name;
	}

	params.suit = suit;
	params.resultObj = result;
	//prepare nameString
	params.nameString = '';
	for(var name in result){
		params.nameString = params.nameString+result[name].count;
	}
	// console.log(params.nameString);
	//if royal flush cards present then cards are in sequence
	if(rf == 5 ){
		params.isInSeq = true;
	}
}

var prepareHighHand = function(params){
	// var params = {};
	// params.set = set;
	params.set = _.sortBy(params.set, "rank");
	buildTypeString(params);
	checkSameSuit(params);
	checkRFInSameSuit(params);
	checkDiffCardsInSeq(params);
	getCards(params);
	delete params.set;
	delete params.isSameSuit;
	delete params.isInSeqInSS;
	delete params.sameSuitCards;
	delete params.isInSeq;
	delete params.nameString;
	delete params.resultObj;
	delete params.suit;
	delete params.nameStr;
	delete params.isRoyalFlushInSS;
	// var cards = params.hand.cards;
	// var name = '';
	// for(var card of cards){
	// 	name = name+card.name;
	// }
	// console.log(params.isSameSuit, params.isInSeq, params.nameString, params.nameStr, name);
	// console.log(params.hand);
}
 
// var set = deck.getRandomCards(7);
// prepareHighHand(set);
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

// for(var hand of hands){
//   var set = _.sortBy(hand, "rank")
//   // var data = assignType(set);
//   // var name = '';
//   // for(var card of data.cards){
//   // 	name = name+card.name;
//   // }
//   // 	console.log(data.handInfo, !!name && name.length >= 5 ? name :"####" );
//   // 	// console.log(data.cards);
//   prepareHighHand(set);
//   	console.log("+++++++++++++++++++++++");
	
// }

module.exports = prepareHighHand;