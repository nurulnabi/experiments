/*
* @Author: noor
* @Date:   2017-05-26 09:36:07
* @Last Modified by:   noor
* @Last Modified time: 2017-05-26 09:45:17
*/

var _ = require('underscore');

var getNHighest = function(cards, n, sortBy){	//sorts in decreasing order
	var key, j, status;
	sortBy = sortBy || "priority";
	for (var i = 1; i < cards.length; i++){
	   key = cards[i];
	   j = i-1;
	   while (j >= 0 && cards[j][sortBy] < key[sortBy]){
	       cards[j+1] = cards[j];
	       j = j-1;
	   }
	   cards[j+1] = key;
	}
	return cards.slice(0, n);
}

var putCardsInSet = function(cards){
	var set = [];
	for(var num in cards){
		set = set.concat(cards[num].cards);
	}
	return set;
};

var getFrequency = function(string) {
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

var uniqObj = function(cards){
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

var checkRF = function(cards){
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
	set.push(cards[0]);

	for(var card of cards){
		if(card[sortBy] == tester+1){
		  tester = card[sortBy];
		  set.push(card);
		}else{
		  if(set.length < n && card[sortBy] != tester){
		    set = [];
		    set.push(card);
		    tester = card[sortBy];
		  }
		}
	};
	var idx    = set.length - n;
	return set.length < n ? [] : set.slice(idx, cards.length) ;
}

var getCardsWithEqualCount = function(cards){
	var result = {};
	for(var key in cards){
		if( !!result[cards[key].count])
			result[cards[key].count] = result[cards[key].count].concat(cards[key].cards)
		else
			result[cards[key].count] = cards[key].cards;
	}
	return result;
}

module.exports = {
	getNHighest				:getNHighest,
	putCardsInSet			:putCardsInSet,	
	getFrequency			:getFrequency,		
	uniqObj					:uniqObj,
	checkRF					:checkRF,
	getNHighestCardsInSeq	:getNHighestCardsInSeq,			
	getCardsWithEqualCount	:getCardsWithEqualCount			
}