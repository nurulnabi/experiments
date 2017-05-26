var winner   = require('./winnerAlgo/entry');
var myWinner = require('./winner');
var hands    = require('./hands5.json')

var params = {"boardCards":
[
  {"type":"heart","rank":10},
  {"type":"diamond","rank":12},
  {"type":"club","rank":11},
  {"type":"diamond","rank":2},
  {"type":"heart","rank":3 }
],
"playerCards":[ {"playerId":"59097377d717c019cfccfcaa","cards":[{"type":"spade","rank":11},{"type":"club","rank":3}]},
{"playerId":"59097377d717c019cfccfcaa","cards":[{"type":"spade","rank":11},{"type":"club","rank":3}]}],
"amount":1000,"potIndex":0,"winners":[],"winningAmount":0,"isRefund":false,"winningAmountAdded":false}

// console.log(params);
// console.log(winner);
// console.log(winner.findBestHand(params));

// var mySt = new Date().getTime();
// var myResult = myWinner(params);
// var myEt = new Date().getTime();
// // myResult.forEach(function(card){
// //   console.log(card.hand);
// // })

// // console.log("+++++++++++legacy++++++++++");
// var result = winner.findWinner(params);
// var et = new Date().getTime();
// // result.forEach(function(card){
// //   console.log(card);
// // })

function checkEquality(str1, str2){
  var obj = {};
  if(str1.length != str2.length){
    console.log("length not equal");
    return false;
  }
  for(var ch of str1){
    if(str2.indexOf(ch) < 0){
      console.log("ch not found: ", ch, str2);
      return false
    }else{
      str2 = str2.replace(ch,'');
    }
  }
  return true;
}

function getNameString(cards){
  var name = "";
  cards.forEach( card => name+=card.name );
  return name
}
// var set = winner.findWinner(params)[0]

// console.log(getNameString(set.set));

var count = 0;
var numArr = [];
var my = 0;
var old = 0;
for(var pCards of hands){
  count++;
  if(count )
    {var mySt = new Date().getTime();
        // console.log(count);
        // 
        // console.log(pCards.playerCards);
        // console.log(pCards.boardCards);
        // break;
        var mySt = new Date().getTime();
        var myResult = myWinner(pCards);
        var myEt = new Date().getTime();
        var result = winner.findWinner(pCards);
        var et = new Date().getTime();
        // console.log(obj);
        // numArr.push({my: myEt-mySt, old: et- myEt});
        my += myEt-mySt;
        old += et-myEt;
        var myStr = getNameString(myResult[0].hand.cards);
        var str = getNameString(result[0].set);
        // console.log(myStr, str);
        // console.log(myResult[0].hand.handInfo.type, result[0].typeName);
        // console.log(pCards.boardCards);
        // pCards.playerCards.forEach(c => console.log(c))
        // console.log("++++++++++++++++++");
        // if(myResult[0].hand.handInfo.type == "Four of a Kind" || result[0].typeName == "Four of A Kind"){
        //   console.log(myStr, str, myResult[0].hand, result[0]);
        // }
        if(!checkEquality(myStr, str) || myResult[0].hand.handInfo.type != result[0].typeName){
          console.log("count: ", count);
          console.log(myStr, str, myResult[0].hand, result[0]);
        }
      }else  continue;

}
console.log(my, old, count);
// var res  = myWinner(params);
// console.log(res[0].hand);
// console.log(res[1].hand);
// console.log("=========================");
// console.log(winner.findWinner(params)[0].set);
// console.log(winner.findWinner(params)[1].set);

// for(var pCards of hands){
//   count++;
//   if(count == 4442){
//     console.log(pCards.boardCards);
//     pCards.playerCards.forEach(c => console.log(c))
//   }
// }
// console.log("my time: ", myEt-mySt, "legacy time: ", et-myEt);