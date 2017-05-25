/*
* @Author: Sushil Jain
* @Author Original: Amrendra / Sushil Kumar
* @Date:   2017-03-02 17:47:56
* @Last Modified by:   sushiljainam
* @Last Modified time: 2017-05-22 13:00:29
*/

// 'use strict';

var cardsConfig = {};

cardsConfig.card = {
	"1" : "Ace",
	"2" : "2",
	"3" : "3",
	"4" : "4",
	"5" : "5",
	"6" : "6",
	"7" : "7",
	"8" : "8",
	"9" : "9",
	"10": "10",
	"11": "J",
	"12": "Q",
	"13": "K",
	"14": "Ace"
};

cardsConfig.highCard      = "High Card with ";
cardsConfig.onePair       = "One pair of ";
cardsConfig.twoPair       = "Two pair of ";
cardsConfig.threeOfAKind  = "3 of a kind of ";
cardsConfig.straight      = "Straight with ";
cardsConfig.flush         = "Flush with suit ";
cardsConfig.fullHouse     = "Full house full of Three ";
cardsConfig.fourOfAKind   = "4 of a kind with 4 ";
cardsConfig.straightFlush = "Suit of ";
cardsConfig.royalFlush    = "Suit of ";

// 1. High Card with Ace
// 2. One pair of K
// 3. two pair of K and 10
// 4. 3 of a kind of K
// 5. Full house full of Three Aces and 2 jacks
// 6. 4 of a kind with 4 Aces
// 7. straight flush with Ace(High) and 10(low)
// 8. Flush with suit Diamond and Queen (High)
// 9. straight flush : Suit of diamond with Ace(High) and 10(low)
// 10. royal flush : Suit of Diamond. 


module.exports = cardsConfig;