var express = require('express');
var router = express.Router();
var dbConn  = require('../database/index');
var db = dbConn.getDb();
// console.log(dbConn,"============", db);

// console.log(router,"=========",db);
router.use(express.static('./public')); 
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.put('/', function(req, res, next){
	console.log(req.body);
	db.insert(req.body, function(err, res){
		res.send(res);
	})
});

router.post('/:suggestion_id/downvote', function(req,res,next){
	console.log(req.body);
	console.log("user requested");
	db.find({}).toArray(function(err, docs){
		res.send(docs);
	})
});

router.get('/data', function(req,res,next){
	console.log(req);
	console.log("user requested");
	db.find({}).toArray(function(err, docs){
		res.send(docs);
	})
});

module.exports = router;
