/*
* @Author: noor
* @Date:   2017-05-19 09:59:13
* @Last Modified by:   noor
* @Last Modified time: 2017-05-25 20:02:41
*/

var deck = require('./deck');
var _ 	 = require('underscore');
var hands = require('./hands4');
var other = require('./compr');
var getName = function(val, isInSeq, isSameSuit){
	switch(val){
		case 11111:
			if(isInSeq && isSameSuit){
			  return "Straight Flush";
			} if(/*!isInSeq &&*/ isSameSuit){
			  return "Flush";
			} if(isInSeq /*&& !isSameSuit*/){
			  return "Straight";
			} /*if(!isInSeq && !isSameSuit)*/{
			  return "High Card"
			}
			break;
		case 41:
		case 14:
			return "Four of A Kind";
			break;
		case 32:
		case 23:
			return "Full House";
			break;
		case 113:
		case 131:
		case 311:
			return "Three of A Kind";
			break;
		case 221:
		case 212:
		case 122:
			return "Two Pair";
			break;
		case 2111:
		case 1211:
		case 1121:
		case 1112:
			return "One Pair";
			break;
	}
}

var assignType = function(set){
	var result = {};
	var isAcePresent = false;
	var isInSeq = true;
	var isSameSuit   = true;
	var RF = { "A":true, "K":true, "Q":true, "J":true, "10":true };		//checks for royal flush
	var rf = 0;	//count for royal flush cards
	var seq = set[0].rank+1;	//check for sequence
	var suit  		 = set[0].type;	//checks for suit
	// console.log(suit);
	for(var name of set){
		if(result[name.name] == undefined){
			result[name.name] = 1;
		}else{
			result[name.name]++;
		}

		if(name.type != suit){
			isSameSuit = false;
		}

		if(name.name == 'A'){
			isAcePresent = true;
		}

		if(RF[name.name]){
			delete RF[name.name];
			rf++;
		}

		if(seq == (name.rank+1)){
			seq++;
		}else{
			isInSeq = false;
		}
	}
	var nameString = '';
	for(var name in result){
		nameString = nameString+result[name];
	}

	// console.log(nameString);
	if(rf == 5 && isSameSuit){
		set.strength = "Royal Flush";
	}else{
		if(rf == 5){
			isInSeq = true;
		}
		set.strength = getName(parseInt(nameString, 10),isInSeq, isSameSuit);
	}
	return {set:set, isAcePresent:isAcePresent, isSameSuit:isSameSuit, isInSeq:isInSeq} ;

}

// var set = deck.getRandomCards(5);
// var arr1 = [];
// var arr2 = [];
// var sum1 = 0;
// var sum2 = 0;
// for(var i=0; i<=0; i++){
// 	(function(){
// 		var set = deck.getRandomCards(5);
// 		set = _.sortBy(set,"rank");
// 		var d =new Date().getTime();
// 		var a = assignType(set).set.strength;
// 		d = new Date().getTime()-d;
// 		var t1,t2;
// 		t2 = new Date().getTime();
// 		var b = other(set).type;
// 		t1 = new Date().getTime()-t2;

// 		arr1.push({a:a.toLowerCase(),b: b.toLowerCase()});
// 		sum1 = sum1+d;
// 		sum2 = sum2+t1;
// 		// arr2.push(t1-d)

// 		// console.log(assignType(set).set.strength);
// 	})();
// }

// console.log(JSON.stringify(arr1));
// console.log(sum2-sum1);

// console.log(deck.getCards());
// console.log(deck.shuffle())
// console.log(deck.getCards());
// var deck1 = deck.getCards()
// var arr = [];
// for(var i=0; i<=15000; i++){
// 	var wholeCard = { playerCards:[], boardCards:[]};
// 	deck.shuffle();
// 	deck1 = deck.getCards();
// 	var n = 0;
// 	for(var j=0; j<5; j++){
// 		wholeCard.boardCards.push(deck1[n]);
// 		n++;
// 	}
// 	// wholeCard.boardCards = deck.getRandomCards(5);
// 	var rand =  Math.floor(Math.random()*6+1);
// 	for(var k = 1; k<= rand; k++){
// 		var card1 = deck1[n];
// 		n++;
// 		var card2 = deck1[n];
// 		n++;
// 		wholeCard.playerCards.push({
// 			playerId: Math.floor(Math.random()*99999999+10000),
// 			cards: [card1, card2]
// 		});
// 	}
// 	arr.push(wholeCard);
// }
// console.log(JSON.stringify(arr));

// function getNameString(cards){
//   var name = "";
//   cards.forEach( card => name+=card.name );
//   return name
// }
// for(var hand of hands){
// 	var cards = [];
// 	for(var pCards of hand.playerCards){
// 		console.log(getNameString(hand.boardCards.concat(cards.concat(pCards.cards))));
// 	}
// }