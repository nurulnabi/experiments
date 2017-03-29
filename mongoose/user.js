/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-03-23 16:45:13
* @Last Modified by:   nurulnabi
* @Last Modified time: 2017-03-25 15:06:01
*/

var mongoose = require('mongoose');
var Person = mongoose.model("Person");
var Story = mongoose.model("Story");


var aaron = [];
aaron.push(new Person({ _id: 0, name: 'Aaron', age: 100 }));
aaron.push(new Person({ _id: 1, name: 'noor', age: 50 }));
aaron.push(new Person({ _id: 1, name: 'nabi', age: 18 }));
aaron.push(new Person({ _id: 2, name: 'ansari', age: 24 }));
aaron.push(new Person({ _id: 0, name: 'md', age: 54 }));

Person.create(aaron,function (err) {
  if (err) return console.log(err);
  
  var story1 = new Story({
    title: "Once upon a timex.",
    _creator: aaron[0]._id    // assign the _id from the person
  });
  
  story1.save(function (err) {
    if (err) return console.log(err);
    // thats it!
  });
});