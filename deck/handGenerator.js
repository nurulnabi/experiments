/*
* @Author: noor
* @Date:   2017-05-22 11:02:51
* @Last Modified by:   noor
* @Last Modified time: 2017-05-26 15:33:28
*/

var numToType = require('./numToType');
var pc 		  = require('./permutation');
var _ 		  = require('underscore');
var helper 	  = require('./helper');

var memoOfHandTypes = {};

var addHands = function(arr,string){
	for(var num of arr){
		memoOfHandTypes[num] = string;
	}
};

var createMemo = function(){
	for(var num in numToType){
		addHands(pc.listCombName(num, false), numToType[num]);
	}
}
createMemo();
// console.log(memoOfHandTypes);

// var getNHighest = function(cards, n, sortBy){
// 	var sidx = cards.length - n;
// 	var set = _.sortBy(cards,sortBy);

// 	return set.slice(sidx,set.length);
// };

// function getNHighest(cards, n, sortBy){	//sorts in decreasing order
// 	var key, j, status;
// 	sortBy = sortBy || "priority";
// 	for (var i = 1; i < cards.length; i++){
// 	   key = cards[i];
// 	   j = i-1;
// 	   while (j >= 0 && cards[j][sortBy] < key[sortBy]){
// 	       cards[j+1] = cards[j];
// 	       j = j-1;
// 	   }
// 	   cards[j+1] = key;
// 	}
// 	return cards.slice(0, n);
// }

// var putCardsInSet = function(cards){
// 	var set = [];
// 	for(var num in cards){
// 		set = set.concat(cards[num].cards);
// 	}
// 	return set;
// };

// function getFrequency(string) {
//     var freq = {};
//     for (var i=0; i<string.length;i++) {
//         var character = string.charAt(i);
//         if (freq[character]) {
//            freq[character]++;
//         } else {
//            freq[character] = 1;
//         }
//     }

//     return freq;
// };

// function uniqObj(cards){
// 	var setObj = {
// 		names:[],
// 		cards:[]
// 	};
// 	for(var card of cards){
// 		if(setObj.names.indexOf(card.name) < 0){
// 			setObj.cards.push(card);
// 			setObj.names.push(card.name);
// 		}
// 	}
// 	return setObj.cards;
// }

// function checkRF(cards){
// 	var RF = { "A":true, "K":true, "Q":true, "J":true, "10":true };		//checks for royal flush
// 	var rf = 0;
// 	for(var card of cards){
// 		if(RF[card.name]){
// 			delete RF[card.name];
// 			rf++;
// 		}
// 	}
// 	return rf == 5 ? true : false;
// }

// var getNHighestCardsInSeq = function(n, cards, sortBy){
// 	var tester = 0;
// 	var set    = [];
// 	var cards  = _.sortBy(cards,sortBy);
// 	tester     = cards[0][sortBy];
// 	set.push(cards[0]);

// 	for(var card of cards){
// 		if(card[sortBy] == tester+1){
// 		  tester = card[sortBy];
// 		  set.push(card);
// 		}else{
// 		  if(set.length < n && card[sortBy] != tester){
// 		    set = [];
// 		    set.push(card);
// 		    tester = card[sortBy];
// 		  }
// 		}
// 	};
// 	var idx    = set.length - n;
// 	return set.length < n ? [] : set.slice(idx, cards.length) ;
// }

// function getCardsWithEqualCount(cards){
// 	var result = {};
// 	for(var key in cards){
// 		if( !!result[cards[key].count])
// 			result[cards[key].count] = result[cards[key].count].concat(cards[key].cards)
// 		else
// 			result[cards[key].count] = cards[key].cards;
// 	}
// 	return result;
// }

var cardsFromHandType = {
	"high card":function(resultObj,nameString){
		var cardArr = helper.putCardsInSet(resultObj);
		return helper.getNHighest(cardArr, 5, "priority");
	},
	"one pair": function(resultObj, nameString){
		var set = [];
		var cards = helper.getCardsWithEqualCount(resultObj);
		set = set.concat(cards['2']);
		return set.concat(helper.getNHighest(cards['1'], 3, "priority"));
	},
	"two pair":function(resultObj, nameString){
		var set = [];
		var freq = helper.getFrequency(nameString);
		var cards = helper.getCardsWithEqualCount(resultObj);

		if(freq['2'] == 2 && freq['1'] == 3){
			set = set.concat(helper.getNHighest(cards['2'], 4, "priority"));
			set = set.concat(_.max(cards['1'], function(o){ return o.priority }));
			return set;
		}
		if(freq['2'] == 3 && freq['1'] == 1){
			var tcards = helper.getNHighest(cards['2'], 4, "priority");
			set = set.concat(tcards);
			var tmpMin = cards['1'].concat(_.min(cards['2'], function(o){ return o.priority }));
			set = set.concat(_.max(tmpMin, function(o){ return o.priority }));
			return set;
		}
	},
	"three of a kind":function(resultObj, nameString){
		var set = [];
		var cards = helper.getCardsWithEqualCount(resultObj);

		set = set.concat(cards['3']);
		return set.concat(helper.getNHighest(cards['1'], 2, "priority"));
	},
	"full house":function(resultObj, nameString){
		var freq = helper.getFrequency(nameString);
		var cards = helper.getCardsWithEqualCount(resultObj);

		var set = [];
		if(freq['3'] == 1 && freq['2'] == 1){
			set = set.concat(cards['3']);
			set = set.concat(cards['2'])
			return set;
		}
		if(freq['3'] == 1 && freq['2'] == 2){
			set = set.concat(cards['3']);
			set = set.concat(helper.getNHighest(cards['2'], 2, "priority"));
			return set;
		}
		if(freq['3'] == 2 && freq['1'] == 1){
			set 		= helper.getNHighest(cards['3'], 3, "priority");
			var minCard = _.min(cards['3'], function(o){ return o.priority });
			var count 	= 0;
			for(var obj of cards['3']){
				if(obj.priority == minCard.priority && count < 2){
					set.push(obj);
					count++;
				}
			}
			return set;
		}
	},
	"four of a kind":function(resultObj, nameString){
		var cards = helper.getCardsWithEqualCount(resultObj);

		var set   = [];
		set = set.concat(cards['4']);
		var tmpCards = [];
		for(var key in cards){
			if(key != '4')
				tmpCards = tmpCards.concat(cards[key]);
		}
		set = set.concat(_.max(tmpCards, function(o){ return o.priority }));
		return set;
	},
	"straight flush":function(resultObj, nameString, sameSuitCards){
		var uniqCards = helper.uniqObj(sameSuitCards);
		return helper.getNHighestCardsInSeq(5, uniqCards, "rank").reverse();
	},
	"straight":function(resultObj, nameString){
		var tmpSet = [];
		for(var key in resultObj){
			tmpSet = tmpSet.concat(resultObj[key].cards)
		}

		var uniqCards = helper.uniqObj(tmpSet);
		return helper.checkRF(uniqCards) ? helper.getNHighestCardsInSeq(5, uniqCards, "priority").reverse() : helper.getNHighestCardsInSeq(5, uniqCards, "rank").reverse();
	},
	"flush":function(resultObj, nameString, sameSuitCards){
		return helper.getNHighest(sameSuitCards, 5, "priority");
	},
	"royal flush":function(resultObj, nameString, sameSuitCards){
		var uniqCards = helper.uniqObj(sameSuitCards);
		return helper.getNHighestCardsInSeq(5, uniqCards, "priority").reverse();
	}
}

module.exports  = { memoOfHandTypes: memoOfHandTypes, cardsFromHandType:cardsFromHandType };