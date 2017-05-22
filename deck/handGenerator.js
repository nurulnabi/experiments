/*
* @Author: noor
* @Date:   2017-05-22 11:02:51
* @Last Modified by:   noor
* @Last Modified time: 2017-05-22 18:25:14
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
		set.push(cards[num].card);
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

function getCardsWithEqualCount(cards){
	var result = {};
	for(var key in cards){
		if( !!result[cards[key].count])
			result[cards[key].count].push(cards[key].card)
		else
			result[cards[key].count] = [cards[key].card];
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
		console.log("getCardsWithEqualCount", cards);
		set.push(cards['2']);
		set.push(cards['2']);
		return set.concat(getNHighest(cards['1'], 3));
	},
	"two pair":function(resultObj, nameString){
		var set = [];
		var freq = getFrequency(nameString);
		var cards = getCardsWithEqualCount(resultObj);
		console.log("getCardsWithEqualCount", cards);

		if(freq['2'] == 2 && freq['1'] == 3){
			set.concat(cards['2']);
			set.concat(cards['2']);
			set.concat(_.max(cards['1'], function(o){ return o.priority }));
			return set;
		}
		if(freq['2'] == 3 && freq['1'] == 1){
			var tcards = getNHighest(cards['2'], 2, "priority");
			set.concat(tcards);
			set.concat(tcards);
			set.concat(cards['1']);
			return set;
		}
	},
	"three of a kind":function(resultObj, nameString){
		var set = [];
		var cards = getCardsWithEqualCount(resultObj);
		console.log("getCardsWithEqualCount", cards);

		set.push(cards['3']);
		set.push(cards['3']);
		set.push(cards['3']);
		return set.concat(getNHighest(cards['1'], 2, "priority"));
	},
	"full house":function(resultObj, nameString){
		var freq = getFrequency(nameString);
		var cards = getCardsWithEqualCount(resultObj);
		console.log("getCardsWithEqualCount", cards);

		var set = [];
		if(freq['3'] == 1 && freq['2'] == 1){
			set.push(cards['3']);
			set.push(cards['3']);
			set.push(cards['3']);
			set.push(cards['2'])
			return set;
		}
		if(freq['3'] == 1 && freq['2'] == 2){
			set.push(cards['3']);
			set.push(cards['3']);
			set.push(cards['3']);
			set.concat(_.max(cards['2'], function(o){ return o.priority }));
			return set;
		}
		if(freq['3'] == 2 && freq['1'] == 1){
			var maxCard = _.max(cards['3'], function(o){ return o.priority });
			var minCard = _.min(cards['3'], function(o){ return o.priority });
			set.push(maxCard);
			set.push(maxCard);
			set.push(maxCard);
			set.push(minCard);
			set.push(minCard);
			return set;
		}
	},
	"four of a kind":function(resultObj, nameString){
		var cards = getCardsWithEqualCount(resultObj);
		console.log("getCardsWithEqualCount", cards);

		var set   = [];
		set.push(cards['4']);
		var tmpCards = [];
		for(var key in cards){
			if(key != '4')
				tmpCards.concat(cards[key]);
		}
		set.concat(_.max(tmpCards, function(o){ return o.priority }));
		return set;
	},
	"straight flush":function(resultObj, nameString){
		var tmpSet = [];
		for(var key in resultObj){
			tmpSet.push(resultObj[key].card)
		}

		return getNHighest(tmpSet, 5, "rank");
	},
	"straight":function(resultObj, nameString){
		var tmpSet = [];
		for(var key in resultObj){
			tmpSet.push(resultObj[key].card)
		}

		return getNHighest(tmpSet, 5, "rank");
	},
	"flush":function(resultObj, nameString){
		var tmpSet = [];
		for(var key in resultObj){
			tmpSet.push(resultObj[key].card)
		}

		return getNHighest(tmpSet, 5, "priority");
	},
	"royal flush":function(resultObj, nameString){
		var tmpSet = [];
		for(var key in resultObj){
			tmpSet.push(resultObj[key].card)
		}

		return getNHighest(tmpSet, 5, "priority");
	}
}

module.exports  = { memoOfHandTypes: memoOfHandTypes, cardsFromHandType:cardsFromHandType };