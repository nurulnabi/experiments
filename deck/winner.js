/*
* @Author: noor
* @Date:   2017-05-24 10:00:31
* @Last Modified by:   noor
* @Last Modified time: 2017-05-24 12:52:48
*/

var _		= require('underscore');
var async	= require('async');

var groupCardsWithEqualRank = function(param, next){
	groupedCards = {};
	for(var card of param.cardsArray){
		if(groupedCards[card.handInfo.strength]){
			groupedCards[card.handInfo.strength].push(card);
		}else{
			groupedCards[card.handInfo.strength] = [ card ];
		}
	}
	param.groupedCards = groupedCards;
	next(null, param);
};

var getHighestCards = function(param, next){
	var groupedCards   = param.groupedCards;
	var key 		   = _.max(Object.keys(groupedCards));
	param.highestCards = groupedCards[key]
	param.maxStrength  = key;
	next(null,param);
};

var decideWinner = function(param, next){
	switch(parseInt(param.maxStrength, 10)){
		case 1:
			return highCardWinner(param, next);
		case 2:
			return onePairWinner(param, next);
		case 3:
			return twoPairWinner(param, next);
		case 4:
			return threeOfAKindWinner(param, next);
		case 5:
			return straightWinner(param, next);
		case 6:
			return flushWinner(param, next);
		case 7:
			return fullHouseWinner(param, next);
		case 8:
			return fourOfAKindWinner(param, next);
		case 9:
			return straightFlushWinner(param, next);
		case 10:
			return royalFlushWinner(param, next);
		default:
			throw new Error("Unable to decide winner").stack;
	}
}

function getCardsSumBy(cards, sumBy){
	var sum = 0;
	for(var card of cards){
		sum = sum + card[sumBy];
	}
	return sum;
}

function highCardWinner(param, next){
	if(params.highestCards.length == 1){
		params.winners = params.highestCards;
		return next(null, param);
	}else{
		
	}
}