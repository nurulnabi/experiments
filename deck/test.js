var _ = require('underscore');
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

arr =     [ { id: 0.6070262042339891,
       type: 'p',
       rank: 1,
       name: 'A',
       priority: 14 },
     { id: 0.9671132233925164,
       type: 'heart',
       rank: 2,
       name: 'K',
       priority: 2 },
     { id: 0.8098088204860687,
       type: 'heart',
       rank: 3,
       name: 'Q',
       priority: 3 },
     { id: 0.6182263130322099,
       type: 'heart',
       rank: 4,
       name: 'J',
       priority: 4 },
     { id: 0.4390297264326364,
       type: 'heart',
       rank: 5,
       name: '5',
       priority: 5 },{ id: 0.4390297264326364,
       type: 'heart',
       rank: 6,
       name: '6',
       priority: 6 },{ id: 0.4390297264326364,
       type: 'heart',
       rank: 9,
       name: '9',
       priority: 9 },
  ];
  console.log(getNHighestCardsInSeq(5, arr, "rank"));
  console.log("+++++++++++++++++++++++");
  console.log(getNHighestCardsInSeq(5, arr, "priority"));