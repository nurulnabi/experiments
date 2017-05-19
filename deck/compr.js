/*
* @Author: noor
* @Date:   2017-05-19 18:32:45
* @Last Modified by:   noor
* @Last Modified time: 2017-05-19 20:26:07
*/
var _ = require('underscore');
var hands = require('./hands3');
var _options = {
    // winning priority of suits are not in action now this is for future use
    wininingPriority: {
      cardType: {
        "spade": {
          priority: 4
        },
        "heart": {
          priority: 3
        },
        "diamond": {
          priority: 2
        },
        "club": {
          priority: 1
        }
      },
      // for setting the hands priority
      setType: {
        "highcard": {
          type: 'High Card',
          displayName: 'High Card',
          priority: 1
        },
        "onepair": {
          type: 'One Pair',
          displayName: 'One Pair',
          priority: 2
        },
        "twopair": {
          type: 'Two Pair',
          displayName: 'Two Pair',
          priority: 3
        },
        "threeofakind": {
          type: 'Three of a Kind',
          displayName: 'Three of a Kind',
          priority: 4
        },
        "straight": {
          type: 'Straight',
          displayName: 'Straight',
          priority: 5
        },
        "flush": {
          type: 'Flush',
          displayName: 'Flush',
          priority: 6
        },
        "fullhouse": {
          type: 'Full House',
          displayName: 'Full House',
          priority: 7
        },
        "fourofakind": {
          type: 'Four of a Kind',
          displayName: 'Four of a Kind',
          priority: 8
        },
        "straightflush": {
          type: 'Straight Flush',
          displayName: 'Straight Flush',
          priority: 9
        },
        "royalflush": {
          type: 'Royal Flush',
          displayName: 'Royal Flush',
          priority: 10
        }
      }
    }
  }

 function getSetType (cardSet) {
    if (isRoyalFlush(cardSet)) {
      return _options.wininingPriority.setType.royalflush;
    }
    if (isStraightFlush(cardSet)) {
      return _options.wininingPriority.setType.straightflush;
    }
    if (isFourOfAKind(cardSet)) {
      return _options.wininingPriority.setType.fourofakind;
    }
    if (isFullHouse(cardSet)) {
      return _options.wininingPriority.setType.fullhouse;
    }
    if (isFlush(cardSet)) {
      return _options.wininingPriority.setType.flush;
    }
    if (isStraight(cardSet)) {
      return _options.wininingPriority.setType.straight;
    }
    if (isThreeOfAKind(cardSet)) {
      return _options.wininingPriority.setType.threeofakind;
    }
    if (isTwoPair(cardSet)) {
      return _options.wininingPriority.setType.twopair;
    }
    if (isOnePair(cardSet)) {
      return _options.wininingPriority.setType.onepair;
    }
    return _options.wininingPriority.setType.highcard;
  }

  //### Check whether hand is royal flush
  function isRoyalFlush(cardSet) {
    if(isSameSuit(cardSet)) {
      var sortedPriority = _.sortBy(cardSet, 'priority');
            return isSameSuit(cardSet) && (sortedPriority[0].priority === 10) && (sortedPriority[1].priority === 11) && (sortedPriority[2].priority === 12) && (sortedPriority[3].priority === 13) && (sortedPriority[4].priority === 14);
    } else {
      return false;
    }
  }

  //### Check whether hand is of same suit
  function isSameSuit(cardSet) {
    var suit;
    var sameCards = _.countBy(cardSet, function(num) {
      suit = num.type;
      return num.type;
    });
    return (cardSet.length === sameCards[suit]);
  }

  //### Check whether hand is of straight flush
  function isStraightFlush(cardSet) {
    if(isSameSuit(cardSet)) {
      var sortedPriority = _.sortBy(cardSet, 'priority');
      var sortedRank = _.sortBy(cardSet, 'rank');
      var checkingPriority = (sortedPriority[0].priority + 1 === sortedPriority[1].priority) && (sortedPriority[1].priority + 1 === sortedPriority[2].priority) && (sortedPriority[2].priority + 1 === sortedPriority[3].priority) && (sortedPriority[3].priority + 1 === sortedPriority[4].priority);
      var checkingRank = (sortedRank[0].rank + 1 === sortedRank[1].rank) && (sortedRank[1].rank + 1 === sortedRank[2].rank) && (sortedRank[2].rank + 1 === sortedRank[3].rank) && (sortedRank[3].rank + 1 === sortedRank[4].rank);
      return checkingPriority || checkingRank;
    } else {
      return false;
    }
  }

  //### Check whether hand is of fourof a kind
  function isFourOfAKind(cardSet) {
    var firstCardCount = _.where(cardSet, {rank : cardSet[0].rank});
    var secondCardCount = _.where(cardSet, {rank : cardSet[1].rank});
    return (firstCardCount.length === 4 || secondCardCount.length === 4)
  }

  //### Check whether hand is of fullHouse
  function isFullHouse(cardSet) {
    var sortedRank = _.sortBy(cardSet, 'rank').reverse();
    var firstCardCount = _.where(sortedRank, {rank : sortedRank[0].rank});
    var remainingTwoCards;
    if(firstCardCount.length === 3) {
      remainingTwoCards = _.where(sortedRank, {rank : sortedRank[3].rank});
      if(remainingTwoCards.length === 2) {
        return true;
      } else {
        return false;
      }
    } else if(firstCardCount.length === 2){
      var remainingThreeCards =  _.where(sortedRank, {rank : sortedRank[2].rank});
      if(remainingThreeCards.length === 3) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
    // return false;
  }

  //### Check whether hand is of flush
  function isFlush(cardSet) {
    if(isSameSuit(cardSet)) {
      return true;
    } else {
      return false;
    }
  }

  //### Check whether hand is of straight
  function isStraight(cardSet) {
    var sortedPriority = _.sortBy(cardSet, 'priority');
    var sortedRank = _.sortBy(cardSet, 'rank');
    var checkingPriority = (sortedPriority[0].priority + 1 === sortedPriority[1].priority) && (sortedPriority[1].priority + 1 === sortedPriority[2].priority) && (sortedPriority[2].priority + 1 === sortedPriority[3].priority) && (sortedPriority[3].priority + 1 === sortedPriority[4].priority);
    var checkingRank = (sortedRank[0].rank + 1 === sortedRank[1].rank) && (sortedRank[1].rank + 1 === sortedRank[2].rank) && (sortedRank[2].rank + 1 === sortedRank[3].rank) && (sortedRank[3].rank + 1 === sortedRank[4].rank);
    return checkingPriority || checkingRank;
  }

  //### Check whether hand is of threeOfAKind
  function isThreeOfAKind(cardSet) {
    var firstCardCount = _.where(cardSet, {rank : cardSet[0].rank});
    var secondCardCount = _.where(cardSet, {rank : cardSet[1].rank});
    var thirdCardCount = _.where(cardSet, {rank : cardSet[2].rank});
    return firstCardCount.length === 3 || secondCardCount.length === 3 || thirdCardCount.length === 3;
  }

  //### Check whether hand is of isTwoPair
  function isTwoPair(cardSet) {
    var sortedRank = _.sortBy(cardSet, 'rank');
    var count = 0;
    for(var i=0; i<sortedRank.length -1; i++) {
      if(sortedRank[i].rank === sortedRank[i+1].rank) {
        count ++;
      }
    }
    if(count === 2) {
      return true;
    } else {
      return false;
    }
  }

  //### Check whether hand is of onePair
  function isOnePair(cardSet) {
    var sortedRank = _.sortBy(cardSet, 'rank');
    for(var i=0; i<sortedRank.length-1; i++) {
      if(sortedRank[i].rank === sortedRank[i+1].rank) {
        return true;
      }
    }
    return false;
  }

  var set = [ { id: 0.6070262042339891,
       type: 'p',
       rank: 1,
       name: 'A',
       priority: 14 },
     { id: 0.9671132233925164,
       type: 'heart',
       rank: 13,
       name: 'K',
       priority: 13 },
     { id: 0.8098088204860687,
       type: 'heart',
       rank: 12,
       name: 'Q',
       priority: 12 },
     { id: 0.6182263130322099,
       type: 'heart',
       rank: 11,
       name: 'J',
       priority: 11 },
     { id: 0.4390297264326364,
       type: 'heart',
       rank: 10,
       name: '10',
       priority: 10 },
  ];

// for(var hand of hands){
// 	getSetType(hand);
// 	// console.log(getSetType(hand));
// }

module.exports = getSetType;