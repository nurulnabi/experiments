/*
* @Author: noor
* @Date:   2017-05-22 11:02:51
* @Last Modified by:   noor
* @Last Modified time: 2017-05-23 14:34:43
*/

var numToType = require('./numToType');
var pc 		  = require('./permutation');
var _ 		  = require('underscore');

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

var getNHighest = function(cards, n, sortBy){
	var sidx = cards.length - n;
	var set = _.sortBy(cards,sortBy);
	return set.slice(sidx,set.length);
};

var putCardsInSet = function(cards){
	var set = [];
	for(var num in cards){
		set = set.concat(cards[num].cards);
	}
	return set;
};

function getFrequency(string) {
    var freq = {};
    for (var i=0; i<string.length;i++) {
        var character = string.charAt(i);
        if (freq[character]) {
           freq[character]++;
        } else {
           freq[character] = 1;
        }
    }

    return freq;
};

function uniqObj(cards){
	var setObj = {
		names:[],
		cards:[]
	};
	for(var card of cards){
		if(setObj.names.indexOf(card.name) < 0){
			setObj.cards.push(card);
			setObj.names.push(card.name);
		}
	}
	return setObj.cards;
}

function checkRF(cards){
	var RF = { "A":true, "K":true, "Q":true, "J":true, "10":true };		//checks for royal flush
	var rf = 0;
	for(var card of cards){
		if(RF[card.name]){
			delete RF[card.name];
			rf++;
		}
	}
	return rf == 5 ? true : false;
}

var getNHighestCardsInSeq = function(n, cards, sortBy){
	var tester = 0;
	var set    = [];
	var cards  = _.sortBy(cards,sortBy);
	tester     = cards[0][sortBy];
	for(var card of cards){
		if(card[sortBy] == tester+1){
		  tester = card[sortBy];
		  set.push(card);
		}else{
		  if(set.length < n){
		    set = [];
		    set.push(card);
		    tester = card[sortBy];
		  }
		}
	};
	var idx    = set.length - n;
	return set.length < n ? [] : set.slice(idx, cards.length) ;
}

function getCardsWithEqualCount(cards){
	var result = {};
	for(var key in cards){
		if( !!result[cards[key].count])
			result[cards[key].count] = result[cards[key].count].concat(cards[key].cards)
		else
			result[cards[key].count] = cards[key].cards;
	}
	return result;
}

var cardsFromHandType = {
	"high card":function(resultObj,nameString){
		var cardArr = putCardsInSet(resultObj);
		return getNHighest(cardArr, 5, "priority");
	},
	"one pair": function(resultObj, nameString){
		var set = [];
		var cards = getCardsWithEqualCount(resultObj);
		// console.log("getCardsWithEqualCount in one pair", cards);
		set = set.concat(cards['2']);
		return set.concat(getNHighest(cards['1'], 3));
	},
	"two pair":function(resultObj, nameString){
		var set = [];
		var freq = getFrequency(nameString);
		var cards = getCardsWithEqualCount(resultObj);
		// console.log("getCardsWithEqualCount in two pair", cards);

		if(freq['2'] == 2 && freq['1'] == 3){
			set = set.concat(cards['2']);
			set = set.concat(_.max(cards['1'], function(o){ return o.priority }));
			return set;
		}
		if(freq['2'] == 3 && freq['1'] == 1){
			var tcards = getNHighest(cards['2'], 4, "priority");
			set = set.concat(tcards);
			set = set.concat(cards['1']);
			return set;
		}
	},
	"three of a kind":function(resultObj, nameString){
		var set = [];
		var cards = getCardsWithEqualCount(resultObj);
		// console.log("getCardsWithEqualCount in three of a kind", cards);

		set = set.concat(cards['3']);
		return set.concat(getNHighest(cards['1'], 2, "priority"));
	},
	"full house":function(resultObj, nameString){
		var freq = getFrequency(nameString);
		var cards = getCardsWithEqualCount(resultObj);
		// console.log("getCardsWithEqualCount full house", cards);

		var set = [];
		if(freq['3'] == 1 && freq['2'] == 1){
			set = set.concat(cards['3']);
			set = set.concat(cards['2'])
			return set;
		}
		if(freq['3'] == 1 && freq['2'] == 2){
			set = set.concat(cards['3']);
			set = set.concat(getNHighest(cards['2'], 2, "priority"));
			return set;
		}
		if(freq['3'] == 2 && freq['1'] == 1){
			var maxCard = _.max(cards['3'], function(o){ return o.priority });
			var minCard = _.min(cards['3'], function(o){ return o.priority });
			var count = 0;
			for(var obj in cards['3']){
				if( obj. priority == maxCard.priority)
					set.push(obj);
				if(obj.priority == minCard.priority && count <=2){
					set.push(obj);
					count++;
				}
			}
			return set;
		}
	},
	"four of a kind":function(resultObj, nameString){
		var cards = getCardsWithEqualCount(resultObj);
		// console.log("getCardsWithEqualCount four of a kind", cards);

		var set   = [];
		set = set.concat(cards['4']);
		// console.log(set, cards['4']);
		var tmpCards = [];
		for(var key in cards){
			if(key != '4')
				tmpCards = tmpCards.concat(cards[key]);
		}
		set = set.concat(_.max(tmpCards, function(o){ return o.priority }));
		// console.log(tmpCards);
		// console.log(set);
		return set;
	},
	"straight flush":function(resultObj, nameString){
		var tmpSet = [];
		for(var key in resultObj){
			tmpSet = tmpSet.concat(resultObj[key].cards)
		}

		var uniqCards = uniqObj(tmpSet);
		return uniqCards.length == 5 ? uniqCards : getNHighest(uniqCards, 5, "rank");
	},
	"straight":function(resultObj, nameString){
		var tmpSet = [];
		for(var key in resultObj){
			tmpSet = tmpSet.concat(resultObj[key].cards)
		}

		var uniqCards = uniqObj(tmpSet);
		// var cardsWithPriority = getNHighest(uniqCards, 5, "priority");	//in case cards of Royal Flush
		// var cardsWithRank = getNHighest(uniqCards, 5, "rank");			//everything else
		
		// var uniqCards = checkRF(uniqCards) ? getNHighest(uniqCards, 5, "priority") : getNHighest(uniqCards, 5, "rank");
		return uniqCards.length == 5 ? uniqCards : checkRF(uniqCards) ? getNHighest(uniqCards, 5, "priority") : getNHighest(uniqCards, 5, "rank");
	},
	"flush":function(resultObj, nameString){
		var tmpSet = [];
		for(var key in resultObj){
			tmpSet = tmpSet.concat(resultObj[key].cards)
		}

		var uniqCards = uniqObj(tmpSet);
		return uniqCards.length == 5 ? uniqCards : getNHighest(uniqCards, 5, "priority");
	},
	"royal flush":function(resultObj, nameString){
		var tmpSet = [];
		for(var key in resultObj){
			tmpSet = tmpSet.concat(resultObj[key].cards)
		}

		var uniqCards = uniqObj(tmpSet);
		return uniqCards.length == 5 ? uniqCards : getNHighest(uniqCards, 5, "priority");
	}
}

module.exports  = { memoOfHandTypes: memoOfHandTypes, cardsFromHandType:cardsFromHandType };