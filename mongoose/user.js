/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-03-23 16:45:13
* @Last Modified by:   noor
* @Last Modified time: 2017-04-27 09:53:55
*/

var mongoose = require('mongoose');
// var Person = mongoose.model("Person");
// var Story = mongoose.model("Story");
// var unit = mongoose.model('Unit');
// var role = mongoose.model('Roles');
// var member = mongoose.model('Member');
var demo = mongoose.model('demo');
// var organization = mongoose.model('Organization');


// member.create({_id:123, name:{first:"noor", last:"ansari"}, email:"noor@cspl.com", phone:7290950261 }, function(err, doc){
// 	if(!err){
// 		role.create({_id:321, name:"suresh", sortIndex:1, member:doc._id }, function(err, roleDoc){
// 			organization.create({_id:786, name:"pawar", sortIndex:2, roles:roleDoc._id}, function(err, orgDoc){
// 				console.log(orgDoc,"==============3");
// 				unit.create({_id:345, name:"patna", unitNumber:543, members:doc._id, orgs:orgDoc._id}, function(err, unit){
// 					console.log(err, unit);
// 				})
// 			})
// 		})
// 	}else{
// 		console.log(err);
// 	}
// var aaron = [];
// aaron.push(new Person({ _id: 0, name: 'Aaron', age: 100 }));
// aaron.push(new Person({ _id: 1, name: 'noor', age: 50 }));
// aaron.push(new Person({ _id: 1, name: 'nabi', age: 18 }));
// aaron.push(new Person({ _id: 2, name: 'ansari', age: 24 }));
// aaron.push(new Person({ _id: 0, name: 'md', age: 54 }));

// Person.create(aaron,function (err) {
//   if (err) return console.log(err);
  
//   var story1 = new Story({
//     title: "Once upon a timex.",
//     _creator: aaron[0]._id    // assign the _id from the person
//   });
  
//   story1.save(function (err) {
//     if (err) return console.log(err);
//     // thats it!
//   });
// });

// var noor = new Person({
// 	_id:999,
// 	name:"sfdsfa",
// 	age:24
// });

// Person.find().byAge().selectName().exec(function(err,res){
// 	console.log(err,res);
// })

// unit.findOne({unitNumber: 543}).populate('orgs').exec(function(err, doc){
// 	console.log(err, doc);
// })

// unit.findOne({unitNumber: 543})
// .populate('orgs')
// .exec(function(err, unitDoc){
// 	var subDoc = unitDoc.orgs;
// 	for(var org of subDoc){
// 		org.populate('roles', function(err, data){
// 			var rolesDoc = data.roles;
// 			for(var role of rolesDoc){
// 				role.populate('member', function(err, rdata){
// 					console.log(JSON.stringify(unitDoc));
// 				})
// 			}
// 		})
// 	}
// })

// Person.findAndModify({_id:555},[],{$set:{age:444}},{new:true, fields:{}}, function(err, doc){
// 	console.log(err, doc);
// })

// unit.findOne({ unitNumber:543 })
// .populate({
// 	path:"orgs",
// 	populate:{
// 		path:"orgs.roles"
// 	}
// }).exec(function(err,doc){
// 	console.log(err, JSON.stringify(doc));
// })
// 
// unit.findOne({ unitNumber:543 })
// .exec(function(err,doc){
// 	console.log(err, doc.facts);
// })

// // Person.find().byAge().selectName().exec(function(err,res){
// // 	console.log(err,res);
// // })

// // Person.findOne({name:"noor"},function(err,res){
// // 	console.log(res);
// // 	res.findSimilar().exec(function(err,res){
// // 		console.log(res);
// // 	})
// // })

// // noor.findSimilar().exec(function(err,res){
// // 	console.log(res);
// // })

// // Person.find().exec(function(err,res){
// // 	res.forEach(function(doc){
// // 		console.log(doc.myAge);
// // 	})
// // })


// var usrs = [
// 	new Person({_id:123, name:"noor"}),
// 	new Person({_id:124, name:"rahul"}),
// 	new Person({_id:125, name:"sanjay"}),
// 	new Person({_id:126, name:"mukesh"}),
// 	new Person({_id:127, name:"ramu"}),
// 	new Person({_id:129, name:"saurav"})
// ]

// var doc = new Person({_id:555, name:"sabji"});
// doc.save(function(err, res){
// 	console.log(err, res);
// })

// var age = 20;

// for(var usr of usrs){
// 	// age++;
// 	console.log("inserted");
// 	Person.create(usr, function(err,doc){
// 		console.log(err,doc);
// 	})
// }

// Person.create({_id:888, name:"sambhu"}, function(err, doc){
//     console.log(err, doc);
// })
// for(var usr of usrs){
// 	age++;
// 	console.log("inserted");
// 	Person.create({_id:age, name:"noor", age:age}, function(err,doc){
// 		console.log(err,doc);
// 	})
// }

// primer.aggregate([
// 		{$limit:5},
// 		{$project:{gradesAvg:{$avg:"$grades.score"}, grades:"$grades.score"}}
// 	], function(err, data){
// 		console.log(err,data);
// 	})

// demo.create({name:"noor", sub:{name:"sita"}},function(err, doc){
// 	console.log(err, doc);
// })

// demo.findOne({}, function(err, doc){
// 	console.log(doc);
// })
// 
var ndemo = new demo({
	name:"noor",
	city:"noida",
	status:"single"
	,walkingWith:"none"
});
// console.log(demo.toString());
// demo.update({ name: "kk" }, {$set:{ walkingWith: "ff"}, $setOnInsert:{ name:"kk", status:"single", city:"kota"}},{ upsert:true }, function(err, res){
// 	console.log(err, res);
// })
// console.log(ndemo);
// ndemo.save();