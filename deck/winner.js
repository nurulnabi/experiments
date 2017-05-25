/*
* @Author: noor
* @Date:   2017-05-24 10:00:31
* @Last Modified by:   noor
* @Last Modified time: 2017-05-25 19:45:49
*/

var _					= require('underscore');
var prepareHighHand		= require('./findType');
var nameAndPriority		= require('./nameAndPriority');

var prepareHighHandForEachPlayer = function(params){
	params.handsArray = [];
	for(var pCards of params.playerCards){
		var tmpParams 	   = { set: []};
		tmpParams.set 	   = params.boardCards.concat(pCards.cards);
		tmpParams.set.forEach(function(card){
			card.name 	  = nameAndPriority.getName(card.rank);
			card.priority = nameAndPriority.getPriority(card.rank);
		});
		tmpParams.playerId = pCards.playerId;
		prepareHighHand(tmpParams);
		params.handsArray.push(tmpParams);
	}
}

var groupCardsWithEqualRank = function(params){
	groupedCards = {};
	for(var playerHand of params.handsArray){
		if(groupedCards[playerHand.hand.handInfo.strength]){
			groupedCards[playerHand.hand.handInfo.strength].push(playerHand);
		}else{
			groupedCards[playerHand.hand.handInfo.strength] = [ playerHand ];
		}
	}
	params.groupedCards = groupedCards;
};

var getHighestCards = function(params){
	var groupedCards   = params.groupedCards;
	var keys 		   = [];
	for(var k in groupedCards){
		keys.push(parseInt(k));
	}
	var key 		   = _.max(keys);
	params.highestCards = groupedCards[key]
	params.maxStrength  = key; 
};

// var decideWinner = function(param){
// 	switch(parseInt(param.maxStrength, 10)){
// 		case 1:
// 			return highCardWinner(param);
// 		case 2:
// 			return onePairWinner(param);
// 		case 3:
// 			return twoPairWinner(param);
// 		case 4:
// 			return threeOfAKindWinner(param);
// 		case 5:
// 			return straightWinner(param);
// 		case 6:
// 			return flushWinner(param);
// 		case 7:
// 			return fullHouseWinner(param);
// 		case 8:
// 			return fourOfAKindWinner(param);
// 		case 9:
// 			return straightFlushWinner(param);
// 		case 10:
// 			return royalFlushWinner(param);
// 		default:
// 			throw new Error("Unable to decide winner").stack;
// 	}
// }

var fingHighestHand = function(params, arr, idx){
  var tester = -Infinity;
  var status = false;
  var tmpArr = [];
  for(var i = 0; i<arr.length; i++){
  	var checker = arr[i].hand.cards[idx].priority;
    if( checker > tester){
        tmpArr = [];
        tester = arr[i].hand.cards[idx].priority;
        tmpArr.push(arr[i]);

      }else if(checker == tester)
        tmpArr.push(arr[i]);
  }
  idx = idx+1;
  // console.log("=================================");
  // console.log(tmpArr[0].hand.cards);
  // console.log("=================================");
  if(idx == 5 || tmpArr.length == 1){
    params.winner = tmpArr;
    return;
  }else
  	fingHighestHand(params, tmpArr, idx);
}	

var decideWinner = function(params){
	prepareHighHandForEachPlayer(params);
	groupCardsWithEqualRank(params);
	getHighestCards(params);
	fingHighestHand(params, params.highestCards, 0);
	return params.winner;
}

module.exports = decideWinner;