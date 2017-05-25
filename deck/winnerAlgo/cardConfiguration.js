/*
* @Author: Sushil Jain
* @Date:   2017-03-02 17:39:58
* @Last Modified by:   noor
* @Last Modified time: 2017-05-25 16:29:37
*/

// 'use strict';

var _ 							= require("underscore"),
	cardsConfig					= require("./cardConfig"),
	cardConfiguration 			= {};


var makeHighCardText = function(cards) {
	// console.log('cards is in makeHighCardText is - ' + JSON.stringify(cards));
	var cards = _.sortBy(cards, 'priority').reverse();
	// console.log('cards is - ' + JSON.stringify(cards));
	// console.log('text is - ' + cardsConfig.card[cards[0].priority])
	return cardsConfig.highCard + cardsConfig.card[cards[0].priority];
}

var makeOnePairText = function(cards) {
	var cards = _.sortBy(cards, 'priority');
	if(cards[0].priority === cards[1].priority) {
		return cardsConfig.onePair + cardsConfig.card[cards[0].priority];
	}
	if(cards[1].priority === cards[2].priority) {
		return cardsConfig.onePair + cardsConfig.card[cards[1].priority];
	}
	if(cards[2].priority === cards[3].priority) {
		return cardsConfig.onePair + cardsConfig.card[cards[2].priority];
	}
	if(cards[3].priority === cards[4].priority) {
		return cardsConfig.onePair + cardsConfig.card[cards[3].priority];
	}
}

var makeTwoPairText = function(cards) {
	var tempArray = _.pluck(cards, "priority");
	// console.log('tempArray is - ' + JSON.stringify(tempArray));
	var single;
	for(var i = 0;i<tempArray.length;i++) {
		single = single^tempArray[i];
	}
	// console.log('single is - ' + single);
	var diff = _.difference(tempArray,[single]);
	// console.log('diff is - ' + JSON.stringify(diff));
	var uniq = _.unique(diff);
	// console.log('uniq is - ' + JSON.stringify(uniq));
	return cardsConfig.twoPair + cardsConfig.card[uniq[0]] + " and " + cardsConfig.card[uniq[1]];
}

var makeThreeOfAKindText = function(cards) {
	var cards = _.sortBy(cards, 'priority');
	return cardsConfig.threeOfAKind + cardsConfig.card[cards[2].priority];
}

var makeStraightText = function(cards) {
	var cards = _.sortBy(cards, 'priority');
	// console.log('cards is in makeStraightText - ' + JSON.stringify(cards));
	return cardsConfig.straight + cardsConfig.card[cards[4].priority] + " (High) and " + cardsConfig.card[cards[0].priority] + " (Low)";
}

var makeFlushText = function(cards) {
	var cards = _.sortBy(cards, 'priority');
	// console.log('cards is in makeStraightText - ' + JSON.stringify(cards));
	return cardsConfig.flush + cards[0].type + " and " + cardsConfig.card[cards[4].priority] + " (High)";
}

var makeFullHouseText = function(cards) {
	// console.log('cards is in makeFullHouseText - ' + JSON.stringify(cards));
	var cards = _.sortBy(cards, 'priority');
	var three = cards[2].priority;
	var tempArray = _.pluck(cards, "priority");
	// console.log('tempArray is - ' + JSON.stringify(tempArray));
	var two = (_.difference(tempArray,[three]))[0];
	// console.log('two is - ' + two);
	return cardsConfig.fullHouse + cardsConfig.card[three] + " and two " + cardsConfig.card[two]; 
}

var makeFourOfAKindText = function(cards) {
	var cards = _.sortBy(cards, 'priority');
	return cardsConfig.fourOfAKind + cardsConfig.card[cards[2].priority]; 
}

var makeStraightFlushText = function(cards) {
	var cards = _.sortBy(cards, 'priority');
	return cardsConfig.straightFlush + cards[0].type + " with " + cardsConfig.card[cards[4].priority] + " (High) and " + cardsConfig.card[cards[0].priority] + " (Low)"; 
}

var makeRoyalFlushText = function(cards) {
	var cards = _.sortBy(cards, 'priority');
	return cardsConfig.royalFlush + cards[0].type;
}



cardConfiguration.findCardConfig = function(params) {
	// console.log('in findCardConfig params are - ' + JSON.stringify(params));
	/*switch(params.type) {
		case  'High Card' 			: return makeHighCardText(params.set); 
    case  'One Pair' 				: return makeOnePairText(params.set); 
    case  'Two Pair' 				: return makeTwoPairText(params.set); 
    case  'Three of a Kind' : return makeThreeOfAKindText(params.set); 
    case  'Straight' 				: return makeStraightText(params.set); 
    case  'Flush' 					: return makeFlushText(params.set); 
    case  'Full House' 			: return makeFullHouseText(params.set); 
    case  'Four of a Kind' 	: return makeFourOfAKindText(params.set); 
    case  'Straight Flush' 	: return makeStraightFlushText(params.set); 
    case  'Royal Flush' 		: return makeRoyalFlushText(params.set); 
    default 								: console.log("this case is exceptional"); break;
	}*/ //temp sushil //reason: later may need
	return params.type; //temp sushil //reason: later may need
}


module.exports = cardConfiguration;
