 /**
  * to create any card; given type (suit), rank
  * @class Card
  * @constructor
  * @param  {String} type suit name (spade, club, heart, diamond)
  * @param  {Number} rank rank of card (1,13)
  */
 function Card(type, rank) {
     this.type = type;
     this.rank = rank;
     this.name = this.getName(rank);
     this.priority = this.getPriority(rank);
 }
 /**
  * get Name for Card
  * @method getName
  * @return {String} name for card
  */
 Card.prototype.getName = function() {
     switch (this.rank) {
         case 1:
             return "A";
         case 11:
             return "J";
         case 12:
             return "Q";
         case 13:
             return "K";
         default:
             return this.rank.toString();
     }
 }
 /**
  * get priority for card; 14 for Ace; else equal to rank
  * @method getPriority
  * @return {Number}    priority
  */
 Card.prototype.getPriority = function() {
     switch (this.rank) {
         case 1:
             return 14;
         default:
             return this.rank;
     }
 }

 module.exports = Card;