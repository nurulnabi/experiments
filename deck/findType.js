/*
* @Author: noor
* @Date:   2017-05-22 15:59:22
* @Last Modified by:   noor
* @Last Modified time: 2017-05-24 16:34:57
*/

var handObject = require('./handGenerator.js');
var hands = require('./hands3');
var deck = require('./deck');
var _ 	 = require('underscore');
var async = require('async');

function getCards(params, next){
	params.resObj = {};
	if(params.isSameSuit && params.isInSeq){
		if(params.isRoyalFlushInSS){
			params.resObj.handInfo  = { type: "Royal Flush", strength: 10 };
			params.resObj.cards = handObject.cardsFromHandType[params.resObj.handInfo.type.toLowerCase()](params.resultObj, params.nameString, params.sameSuitCards);
		}else{
			params.resObj.handInfo  = { type: "Straight Flush", strength: 9 };
			params.resObj.cards = handObject.cardsFromHandType[params.resObj.handInfo.type.toLowerCase()](params.resultObj, params.nameString, params.sameSuitCards);
		}
	}else if(params.isSameSuit && !params.isInSeq){
		params.resObj.handInfo  = { type: "Flush", strength:6 };
		params.resObj.cards =  handObject.cardsFromHandType[params.resObj.handInfo.type.toLowerCase()](params.resultObj, params.nameString, params.sameSuitCards);
	}else if(!params.isSameSuit && params.isInSeq){
		params.resObj.handInfo  = { type: "Straight", strength: 5};
		params.resObj.cards = handObject.cardsFromHandType[params.resObj.handInfo.type.toLowerCase()](params.resultObj, params.nameString);
	}else{
		params.resObj.handInfo  = handObject.memoOfHandTypes[params.nameString];
		params.resObj.cards = handObject.cardsFromHandType[params.resObj.handInfo.type.toLowerCase()](params.resultObj, params.nameString);
	}
	next(null, params);
}

function checkSameSuit(params, next){
	var suit = params.suit;
	params.isSameSuit = false;
	params.sameSuitCards = [];
	for(var type in suit){
		if(suit[type].length >= 5){
			params.isSameSuit = true;
			params.sameSuitCards = suit[type];
			break;
		}
	}
	next(null, params);
}

function checkRFInSameSuit(params, next){
	var cards = params.sameSuitCards;
	var RF = { "A":true, "K":true, "Q":true, "J":true, "10":true };		//checks for royal flush
	var rf = 0;
	for(var card of cards){
		if(RF[card.name]){
			delete RF[card.name];
			rf++;
		}
	}
	params.isRoyalFlushInSS = rf == 5 ? true : false;
	next(null, params);
}

function checkCardsInSequence(params, next){
	var cards = params.set;
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

	params.isInSeq = seq >= 5 || params.isInSeq ? true : false;
	next(null, params);
}

var buildTypeString = function(params, next){
	var suit = {};
	var result = { };
	var RF = { "A":true, "K":true, "Q":true, "J":true, "10":true };		//checks for royal flush cards
	var rf = 0;	//count for royal flush cards
	// console.log(suit);
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
	}

	params.suit = suit;
	params.resultObj = result;
	//prepare nameString
	params.nameStr    = ''; 
	params.nameString = '';
	for(var name in result){
		params.nameStr    = params.nameStr+name; 
		params.nameString = params.nameString+result[name].count;
	}
	
	//if royal flush cards present then cards are in sequence
	if(rf == 5 ){
		params.isInSeq = true;
	}

	// console.log(nameString, nameStr);
	// console.log(rf, isSameSuit, isInSeq, nameString, seq);
	// return getCards(result, nameString, isSameSuit, isInSeq, rf, sameSuitCards);
	next(null, params);
}

var prepareHighHand = function(set){
	var params = {};
	params.set = set;
	async.waterfall([
			async.apply(buildTypeString, params),
			checkSameSuit,
			checkRFInSameSuit,
			checkCardsInSequence,
			getCards
		], function(err, params){
			var cards = params.resObj.cards;
			var name = '';
			for(var card of cards){
				name = name+card.name;
			}
			console.log(params.isSameSuit, params.isInSeq, params.nameString, params.nameStr, name);
			console.log(params.resObj);
		});
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

for(var hand of hands){
  var set = _.sortBy(hand, "rank")
  // var data = assignType(set);
  // var name = '';
  // for(var card of data.cards){
  // 	name = name+card.name;
  // }
  // 	console.log(data.handInfo, !!name && name.length >= 5 ? name :"####" );
  // 	// console.log(data.cards);
  prepareHighHand(set);
  	console.log("+++++++++++++++++++++++");
	
}